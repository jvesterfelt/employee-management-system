const inquirer = require('inquirer');
const Employee = require('../lib/Employee');
const Department = require('../lib/Department');
const Role = require('../lib/Role');
const db = require('../config/connection');

const viewRoles = () => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, [], function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table(results);
        promptUser();
    });
};


const addRole = (response) => {
    const sql = 'INSERT INTO roles ("id", "title", "salary", "department_id") VALUES (?, ?, ?, ?)';

    db.query(sql, [], function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table('Results: ', results);
        promptUser();
    })
};

const viewEmployees = () => {
    const sql = 'SELECT * FROM employees '
    db.query(sql, [], function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table('Results: ', results);
        promptUser();
    })
};

const addEmployee = () => {
    const sql = 'INSERT INTO employees VALUES (?, ?, ?, ?)';
    db.query(sql, [], function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table('Results: ', results);
        promptUser();
    })
};

const updateEmployee = () => {
    const sql = 'UPDATE employees SET role_id = (?) WHERE id = (?)';

    db.query(sql, [], function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table('Results: ', results);
        promptUser();
    })
};

const viewDepartments = () => {
    const sql = 'SELECT * FROM departments';

    db.query(sql, [], function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table('Results: ', results);
        promptUser();
    })
};

const addDepartment = () => {
    const sql = 'INSERT INTO departments VALUES (?, ?)'

    db.query(sql, [], function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table('Results: ', results);
        promptUser();
    })
};

const promptUser = async function() {
    await inquirer.prompt({
            type: 'list',
            name: 'begin',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        })
        .then(action => {
            switch (action.begin) {
                case 'View all departments':
                    console.log('view departments');
                    viewDepartments();
                    break;
                case 'View all roles':
                    console.log('view roles');
                    viewRoles();
                    break;
                case 'View all employees':
                    console.log('view employees');
                    viewEmployees();
                    break;
                case 'Add a department':
                    console.log('add department');
                    addDepartment();
                    break;
                case 'Add a role':
                    console.log('add role');
                    addRole();
                    break;
                case 'Add an employee':
                    console.log('add employee');
                    addEmployee();
                    break;
                case 'Update an employee role':
                    console.log('update employee role');
                    updateEmployee();
                    break;
                default:
                    console.log('Error: Application failed.');
                    promptUser();
            }
        })
};

module.exports = { promptUser };