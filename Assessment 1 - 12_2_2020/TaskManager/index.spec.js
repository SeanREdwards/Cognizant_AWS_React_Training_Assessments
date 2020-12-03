const { test } = require("@jest/globals");
const TaskManager = require("./index");
const index = require("./index");

describe("Proof test framework works.", () => {
    test("Simple true assertion.", () => {
        expect(true).toBe(true);
    });
});

describe("Test TaskManager creation.", () => {
    test("Check class name", () => {
        let tm = new TaskManager();
        expect(tm.constructor.name).toBe("TaskManager");
    });

    test("Check initial length", () => {
        let tm = new TaskManager();
        expect(tm.size).toBe(0);
    });

    test("Check initial uniqueId", () => {
        let tm = new TaskManager();
        expect(tm.uniqueId).toBe(1);
    });

    test("Check initial projectList size", () => {
        let tm = new TaskManager();
        expect(tm.projectList.length).toBe(1);
    });
});

describe("Test addNewTask functionality of TaskManager.", () => {
    test("Add one new task", () => {
        let tm = new TaskManager();
        tm.addNewTask("Make Breakfast");
        expect(tm.size).toBe(1);
        expect(tm.projectList.length).toBe(1);
        expect(tm.projectList[0].taskList.length).toBe(1);
    });

    test("Add two new tasks", () => {
        let tm = new TaskManager();
        tm.addNewTask("Make Breakfast");
        tm.addNewTask("Feed Cat");

        expect(tm.size).toBe(2);
        expect(tm.projectList.length).toBe(1);
        expect(tm.projectList[0].taskList.length).toBe(2);
    });

    test("Add five new tasks", () => {
        let tm = new TaskManager();
        tm.addNewTask("Make Breakfast");
        tm.addNewTask("Feed Cat");
        tm.addNewTask("Make Lunch");
        tm.addNewTask("Scratch Cat");
        tm.addNewTask("Make Dinner");

        expect(tm.size).toBe(5);
        expect(tm.projectList.length).toBe(1);
        expect(tm.projectList[0].taskList.length).toBe(5);
    });

    describe("Test editTask functionality of TaskManager.", () => {
        test("Editting one task, one attribute.", () => {
            let tm = new TaskManager();
            let task = tm.addNewTask("Feed Cat");
            tm.editTask(1, "Pet Cat", task.project ,task.schedule, task.label, task.priority);
            expect(tm.projectList[0].taskList[0].text).toBe("Pet Cat");
        });

        test("Editting one task of 4, two attributes.", () => {
            let tm = new TaskManager();
            tm.addNewTask("Feed Cat");
            tm.addNewTask("Play with Cat");
            let task = tm.addNewTask("Scratch Cat");
            tm.addNewTask("Brush Cat");
            tm.editTask(3, "Pet Cat", task.project ,task.schedule, task.label, "p1");
            expect(tm.projectList[0].taskList[2].text).toBe("Pet Cat");
            expect(tm.projectList[0].taskList[2].priority).toBe("p1");
        });
    });

    describe("Test searchTask functionality of TaskManager.", () => {
        test("Search on available string.", () => {
            let tm = new TaskManager();
            tm.addNewTask("Feed Cat");
            let numMatches = tm.searchTasks("Feed Cat");
            expect(numMatches).toBe(1);
        });

        test("Search on unavailable string.", () => {
            let tm = new TaskManager();
            tm.addNewTask("Feed Cat");
            let numMatches = tm.searchTasks("Pet Cat");
            expect(numMatches).toBe(0);
        });

        test("Search on partial string.", () => {
            let tm = new TaskManager();
            tm.addNewTask("Feed Cat");
            let numMatches = tm.searchTasks("Feed");
            expect(numMatches).toBe(1);
        });
    
        test("Search on available string with 4 entries", () => {
            let tm = new TaskManager();
            tm.addNewTask("Feed Cat");
            tm.addNewTask("Play with Cat");
            tm.addNewTask("Scratch Cat");
            tm.addNewTask("Brush Cat");
            let numMatches = tm.searchTasks("Play");
            expect(numMatches).toBe(1);
        });

        test("Search on unavailable string with 4 entries", () => {
            let tm = new TaskManager();
            tm.addNewTask("Feed Cat");
            tm.addNewTask("Play with Cat");
            tm.addNewTask("Scratch Cat");
            tm.addNewTask("Brush Cat");
            let numMatches = tm.searchTasks("Fight");
            expect(numMatches).toBe(0);
        });

        test("Search on partial string with 4 entries", () => {
            let tm = new TaskManager();
            tm.addNewTask("Feed Cat");
            tm.addNewTask("Play with Cat");
            tm.addNewTask("Scratch Cat");
            tm.addNewTask("Brush Cat");
            let numMatches = tm.searchTasks("Pet");
            expect(numMatches).toBe(0);
        });
    });
});