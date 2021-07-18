const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_management_system'
    },
    console.log('Connected to the employee_management_system.'));

module.exports = db;