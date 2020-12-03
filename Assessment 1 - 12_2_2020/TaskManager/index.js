"use strict"
/*TaskManager.js
*@Author Sean Edwards
*@Version 1.0 
*Simple JavaScript Application to create a task manager.
*This manager allows users to add, edit, view, and search tasks.
*/

/*initial console setup:
    mkdir TaskManager
    cd TaskManager
    npm init  //skip entries of info
    npm i jest -D
    npm i lodash moment

for testing
    npm run test
*/


//Include dependencies.
const _ = require("lodash");
const moment = require("moment");
const Task = require("./Model/Task");
const Project = require("./Model/Project");

//Create datastructure to hold tasks.
//TODO potentially move to own js file. Ask Nag about this.

/*TaskManager
 *  Class to function as overall datastructer of the task manager, holding project data structures
 *  subsequently Task objects.
 */ 
class TaskManager{
    constructor(){
        this.uniqueId = 1;
        this.size = 0;
        this.projectList = [new Project("Inbox")]; //Setup project list and add default project.
    };

    /*Function to add tasks to a task list, defaulting to the Inbox project.
    *@Returns the task that was added.
    */
    addNewTask(text ){
        let taskToAdd = new Task(this.uniqueId, text);
        this.uniqueId++; 
        this.projectList[0].taskList.push(taskToAdd);
        this.size++;
        return taskToAdd;
    }

    //Function to add tasks to a task list.
    editTask(id, newText, newProject, newSchedule, newLabel, newPriority){
        let foundId = false;
        let taskIndex = -1;
        let projectIndex = -1;
        for(let i = 0; i < this.projectList.length && !foundId; i++){
            taskIndex = this.projectList[i].taskList.findIndex(task => task.id === id);
            if (taskIndex >= 0){
                foundId = true;
                projectIndex = i;
            }
        }
        
        //Output success message if found and make changes.
        if(foundId){
            console.log("Task to edit successfully found!");
            console.log();
            let taskToChange = this.projectList[projectIndex].taskList[taskIndex];
            taskToChange.text = newText;
            taskToChange.project = newProject;
            taskToChange.schedule = newSchedule;
            taskToChange.label = newLabel;
            taskToChange.priority = newPriority;

        }else{ //Output if task was not found.
            console.log("ERROR - Task to edit was NOT found!");
            console.log("No changes were made.");
            console.log();
        }
    }

    //Outputs all tasks under a selected project.
    viewTasks(selection){
        console.log(`Tasks associated with Selection: ${selection}`);
        if(selection === "ALL"){
            //Further step links each task under the project name for clarity.
            this.projectList.forEach(project => {
                console.log(`Project Name: ${project.name}`);
                project.taskList.forEach(task =>{
                    tm.outputTask(task);
                });
            });
        }else{
            _.find(this.projectList, function(project) {
                project.taskList.forEach(task =>{
                    tm.outputTask(task);
                }); 
            });
        }

        console.log();
    }

    /*Function to search the text attribute of a task based on a user provided string and output matching tasks.
    *@Returns the total number of successful matches.
    */
    searchTasks(str){
        console.log(`Search: ${str}`)
        let numMatches= 0;

        //Go through Tasks and output any partial string matches found, matching on text attribute.
        this.projectList.forEach(project => {
            project.taskList.forEach(task =>{
                if(task.text.search(str) >= 0){
                    numMatches++;
                    tm.outputTask(task);
                }
            });
        });

        //Output # matches of found.
        if(numMatches > 0){
            console.log(`This search found ${numMatches} matches.`);
        }else{
            console.log("No matches were found.");
        }

        console.log();
        return numMatches;
    }

    //Class to output a Task's information. Created this to avoid repetition within other functions.
    outputTask(task){
        console.log(`Task ID: ${task.id} | Text: ${task.text} | Schedule: ${task.schedule} | Label: ${task.label} | Priority: ${task.priority}`);
    }
}

//Create task manager.
let tm = new TaskManager();

//For console based testing
//Add tasks
// tm.addNewTask("Make Breakfast");
// tm.addNewTask("Feed Cat");
// tm.addNewTask("Make Lunch");
// tm.addNewTask("Scratch Cat");
// tm.addNewTask("Make Dinner");

// tm.viewTasks("ALL");

// tm.editTask(4, "Pet Cat", "Inbox", moment(), "None", "p1");

// tm.viewTasks("Inbox");

// tm.searchTasks("Make");
// tm.searchTasks("Scratch");
// tm.searchTasks("Pet");

module.exports = TaskManager;