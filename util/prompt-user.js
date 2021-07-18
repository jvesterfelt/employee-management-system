const inquirer = require('inquirer');
const Employee = require('../lib/Employee');
const Department = require('../lib/Department');
const Role = require('../lib/Role');

const promptUser = function() {
    inquirer.prompt({
            type: 'list',
            name: 'begin',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        })
        .then(action => {
            switch (action.begin) {
                case 'View all departments':
                    Department.viewAllDepartmens();
                    break;
                case 'View all roles':
                    Role.viewAllRoles();
                    break;
                case 'View all employees':
                    Employee.viewAllEmployees();
                    break;
                case 'Add a department':
                    Department.addDepartment();
                    break;
                case 'Add a role':
                    Role.addRole();
                    break;
                case 'Add an employee':
                    Employee.addEmployee();
                    break;
                case 'Update an employee role':
                    Employee.updateEmployee();
                    break;
                default:
                    console.log('Error: Application failed.');
                    promptUser();
            }
        })
};

module.exports = { promptUser };