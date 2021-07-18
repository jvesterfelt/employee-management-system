const inquirer = require('inquirer');
const db = require('../config/connection');

class Role {
    constructor(id, title, salary, department_id) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    viewRoles() {
        const sql = 'SELECT * FROM roles';
    }

    addRole() {}
};

module.exports = Role;