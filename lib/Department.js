class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    viewDepartments() {
        const sql = 'SELECT * FROM departments';
    }

    addDepartment() {}
};

module.exports = Department;