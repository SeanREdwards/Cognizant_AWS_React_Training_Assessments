"use strict";
const moment = require("moment");

class Task{
    constructor(id, text){
        this.id = id;
        this.text = text;
        this.project = "inbox"; //Default project is inbox.
        this.schedule = moment(); //today, tomorrow, this week, next week
        this.label = "None"; //Default label is empty
        this.priority = "p4"; //Default priority = p4
    };
}

module.exports = Task;
