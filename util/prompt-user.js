const inquirer = require('inquirer');
const Employee = require('../lib/Employee');
const Department = require('../lib/Department');
const Role = require('../lib/Role');
const db = require('../config/connection');

const viewRoles = () => {
    const sql = 'SELECT * FROM roles LEFT JOIN departments ON roles.department_id = departments.id;';
    db.query(sql, function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table(results);
        promptUser();
    });
};


const addRole = (response) => {
    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);';
    const params = []

    inquirer
        .prompt([{
            type: 'input',
            name: 'role_title',
            message: 'Please enter the role title.',
            validate: role_title_response => {
                if (!role_title_response) {
                    console.log('Make sure to enter the role title.');
                    return false;
                }
                return true;
            }
        }, {
            type: 'input',
            name: 'role_salary',
            message: 'Please enter the role salary.',
            validate: role_salary_response => {
                if (!role_salary_response) {
                    console.log('Make sure to enter the role salary.');
                    return false;
                }
                return true;
            }
        }, {
            type: 'input',
            name: 'department_id',
            message: 'Please enter the department ID the role belongs to.',
            validate: department_id_response => {
                if (!department_id_response) {
                    console.log('Make sure to enter the associated department ID.');
                    return false;
                }
                return true;
            }
        }])
        .then(dbRoleData => {
            params.push(dbRoleData.role_title, dbRoleData.role_salary, dbRoleData.department_id);
            console.log('params', params);
        })
        .then(result => {
            db.query(sql, params, function(err, results) {
                if (err) {
                    console.log('Error running query.', err);
                }
                console.log('Results: ', results);
                promptUser();
            })
        });
};

const viewEmployees = () => {
    const sql = 'SELECT * FROM employees e LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN employees m ON e.manager_id = m.id;'
    db.query(sql, function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table(results);
        promptUser();
    });
};

const addEmployee = () => {
    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);';
    const params = [];

    inquirer
    .prompt([{
        type: 'input',
        name: 'first_name',
        message: "Please enter the employee's first name",
        validate: fnData => {
            if (!fnData) {
                console.log('You must enter the employee name');
                return false;
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'last_name',
        message: "Please enter the employee's last name",
        validate: lnData => {
            if (!lnData) {
                console.log('You must enter the employee last name');
                return false;
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'role_id',
        message: "Please enter the ID for the employee's new role",
        validate: roleData => {
            if (!roleData) {
                console.log('You must enter the role ID');
                return false;
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'manager_id',
        message: "Please enter the ID for the employee's manager"
    }])
    .then(employeeData => {
        params.push(employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id);
        
        db.query(sql, params, function(err, results) {
                if (err) {
                    console.log('Error running query.', err);
                }
                console.log('Results: ', results);
                promptUser();
            });
    });
    
};

const updateEmployeeRole = () => {
    const sql = 'UPDATE employees SET role_id = (?) WHERE id = (?);';
    const params = [];

    inquirer
        .prompt([{
            type: 'input',
            name: 'role_id',
            message: "Please enter the employee's new role ID",
            validate: roleIdData => {
                if (!roleIdData) {
                    console.log('You must enter the new role ID');
                    return false;
                }
                return true;
            }
        }, {
            type: 'input',
            name: 'employee_id',
            message: "Please enter the employee's ID.",
            validate: empIdData => {
                if (!empIdData) {
                    console.log('You must enter the employee ID');
                    return false;
                }
                return true;
            }
        }])
        .then(result => {
            params.push(result.employee_id, result.role_id)
            db.query(sql, params, function(err, results) {
                if (err) {
                    console.log('Error running query.', err);
                }
                console.log('Results: ', results);
                promptUser();
            })
        })
};

const updateEmployeeManager = () => {
    const sql = 'UPDATE employees SET manager_id = (?) WHERE id = (?);';
    const params = [];

    inquirer
        .prompt([{
            type: 'input',
            name: 'role_id',
            message: "Please enter the employee's new manager ID",
            validate: roleIdData => {
                if (!roleIdData) {
                    console.log('You must enter the new role ID');
                    return false;
                }
                return true;
            }
        }, {
            type: 'input',
            name: 'employee_id',
            message: "Please enter the employee's ID.",
            validate: empIdData => {
                if (!empIdData) {
                    console.log('You must enter the employee ID');
                    return false;
                }
                return true;
            }
        }])
        .then(result => {
            params.push(result.employee_id, result.role_id)
            db.query(sql, params, function(err, results) {
                if (err) {
                    console.log('Error running query.', err);
                }
                console.log('Results: ', results);
                promptUser();
            })
        })
};

const viewDepartments = () => {
    const sql = 'SELECT * FROM departments;';

    db.query(sql, function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table(results);
        promptUser();
    });
};

const addDepartment = () => {
    const sql = 'INSERT INTO departments (name) VALUES (?);'

    inquirer
        .prompt([{
            type: 'input',
            name: 'department_name',
            message: 'Please enter the new department name.',
            validate: deptData => {
                if (!deptData) {
                    console.log('You must enter the department name.');
                    return false;
                }
                return true;
            }
        }])
        .then(dbDeptData => {
            const name = [dbDeptData.department_name];
            console.log('name', name);

            db.query(sql, name, function(err, results) {
                if (err) {
                    console.log('Error running query.', err);
                }
                console.log('Results: ', results);
                promptUser();
            });
        });
};

const viewEmployeesByManager = () => {
    const sql = 'SELECT * FROM employees WHERE manager_id = (?);';
    const params = [];

inquirer.prompt([{
    type: 'input',
    name: 'manager_id',
    message: 'Please enter the ID of the employee manager',
    validate: response => {
        if (!response) {
            console.log('You must enter the manager ID');
            return false;
        }
        return true;
    }
}]).then(dbViewData => {
        params.push(dbViewData.manager_id);
        db.query(sql, params, function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table(results);
        promptUser();
    });
    })
};

const viewEmployeesByDepartment = () => {
    const sql = 'SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id WHERE departments.id = (?);';
    const params = [];

    inquirer.prompt([{
    type: 'input',
    name: 'department_id',
    message: 'Please enter the department ID to view',
    validate: response => {
        if (!response) {
            console.log('You must enter the department ID');
            return false;
        }
        return true;
    }
}]).then(dbViewData => {
        params.push(dbViewData.department_id);
        db.query(sql, params, function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table(results);
        promptUser();
    });
    });
};

const deleteDepartment = () => {
    const sql = 'DELETE FROM departments WHERE id = (?)';
    const params = [];

inquirer.prompt([{
    type: 'input',
    name: 'department_id',
    message: 'Enter the department ID you wish to delete',
    validate: response => {
        if (!response) {
            console.log('You must enter the department ID');
            return false;
        }
        return true;
    }
}]).then(dbViewData => {
        params.push(dbViewData.department_id);
        db.query(sql, params, function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.log(results);
        promptUser();
    });
    });
};

const deleteRole = () => {
   const sql = 'DELETE FROM roles WHERE id = (?)';
    const params = [];

inquirer.prompt([{
    type: 'input',
    name: 'role_id',
    message: 'Enter the role ID you wish to delete',
    validate: response => {
        if (!response) {
            console.log('You must enter the role ID');
            return false;
        }
        return true;
    }
}]).then(dbViewData => {
        params.push(dbViewData.role_id);
        db.query(sql, params, function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.log(results);
        promptUser();
    });
    });
};

const deleteEmployee = () => {
    const sql = 'DELETE FROM employees WHERE id = (?)';
    const params = [];

inquirer.prompt([{
    type: 'input',
    name: 'employee_id',
    message: 'Enter the employee ID you wish to delete',
    validate: response => {
        if (!response) {
            console.log('You must enter the employee ID');
            return false;
        }
        return true;
    }
}]).then(dbViewData => {
        params.push(dbViewData.employee_id);
        db.query(sql, params, function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table(results);
        promptUser();
    });
    });
};

const totalDepartmentBudget = () => {
    const sql = 'SELECT SUM(salary) FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN departments ON roles.id = departments.id WHERE departments.id = (?);';
    const params = [];

    inquirer.prompt([{
        type: 'input',
        name: 'department_id',
        message: 'Please enter the department ID for the budget utilization you would like to see',
        validate: response => {
            if (!response) {
                console.log('Please enter the department ID');
                return false;
            }
            return true;
        }
    }]).then(dbViewData => {
        params.push(dbViewData.department_id);
        db.query(sql, params, function(err, results) {
        if (err) {
            console.log('Error running query.', err);
        }
        console.table(results);
        promptUser();
    });
    })
};



const promptUser = async function() {
    await inquirer.prompt({
            type: 'list',
            name: 'begin',
            message: 'What would you like to do?',
            choices: [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            "Update an employee role", 
            "Update an employee's manager",
            'View employees by manager',
            'View employees by department',
            'Delete department',
            'Delete role',
            'Delete employee',
            'View total department budget',
            'Quit']
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
                    updateEmployeeRole();
                    break;
                case "Update an employee's manager":
                    console.log('update employee manager');
                    updateEmployeeManager();
                    break;
                case 'View employees by manager':
                    console.log('View employees by manager');
                    viewEmployeesByManager();
                    break;
                case 'View employees by department':
                    console.log('View employees by department');
                    viewEmployeesByDepartment();
                    break;
                case 'Delete department':
                    console.log('Delete department');
                    deleteDepartment();
                    break;
                case 'Delete role':
                    console.log('Delete role');
                    deleteRole();
                    break;
                case 'Delete employee':
                    console.log('Delete employee');
                    deleteEmployee();
                    break;
                case 'View total department budget':
                    console.log('View total department budget');
                    totalDepartmentBudget();
                    break;
                case 'Quit':
                    process.exit();
                default:
                    console.log('Error: Application failed.');
                    promptUser();
            }
        });
    return false;
};

module.exports = { promptUser };