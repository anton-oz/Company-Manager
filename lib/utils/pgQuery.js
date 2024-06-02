const {Client} = require("pg");
const tableMaker = require("./tableMaker");
const inquirer = require("inquirer");


const pgQuery = async (answer, client) => {
    let res;
    let department;
    let departments;
    let role;
    let roles;
    let roleId;
    let employee;
    let employees;

    switch (answer) {
        case 'View all departments':
            res = await client.query('SELECT * FROM department;');
            tableMaker(res);
            break;
        case 'View all roles':
            res = await client.query(
                `SELECT role.id, role.title, department.name AS department, role.salary
                FROM role
                INNER JOIN department ON role.department_id = department.id;`
            );
            tableMaker(res);
            break;
        case 'View all employees':
            res = await client.query(
                `SELECT e.id, e.first_name, e.last_name, role.title, 
                department.name AS department, role.salary, CONCAT(m.first_name, ' ',m.last_name) AS manager
                FROM employee e
                LEFT JOIN employee m ON m.id = e.manager_id
                INNER JOIN role ON role.id = e.role_id
                INNER JOIN department ON department.id = role.department_id`
            );
            tableMaker(res);
            break;
        case 'Add new department':
            department = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the new department?',
                    name: 'name',
                }
            ]);
            await client.query(
                `INSERT INTO department (name)
                VALUES
                    ('${department.name}');`
            );
            console.log(`\nAdded ${department.name} department into database.\n`);
            break;
        case 'Delete a department':
            departments = await getDepartments(client);
            const deleteDepartment = await inquirer.prompt([
                {
                    type: 'list',
                    choices: departments,
                    message: 'Select a department to delete:',
                    name: 'name',
                }
            ]);
            await client.query(
                `DELETE FROM department
                WHERE department.name = '${deleteDepartment.name}';`
            )
            console.log(
                `\nRemoved department ${deleteDepartment.name} from database along with any employees from that department.\n`
            );
            break;
        case 'Add new role':
            departments = await getDepartments(client);
            role = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the title of the new role?',
                    name: 'roleName',
                },
                {
                    type: 'input',
                    message: 'What is the salary of the new role?',
                    name: 'salary',
                },
                {
                    type: 'list',
                    choices: departments,
                    message: 'What department does this role belong to?',
                    name: 'department',
                },
            ]);
            department = await client.query(
                `SELECT department.id FROM department
                WHERE department.name = '${role.department}';`
            );
            let departmentId = department.rows[0].id;
            await client.query(
                `INSERT INTO role (title, salary, department_id)
                 VALUES
                    ('${role.roleName}', ${role.salary}, ${departmentId});`);
            console.log(`\nAdded ${role.roleName} to database.\n`);
            break;
        case 'Delete a role':
            roles = await getRoles(client);
            role = await inquirer.prompt([
                {
                    type: 'list',
                    choices: roles,
                    message: 'Select a role to delete:',
                    name: 'delete',
                },
            ]);
            await client.query(
                `DELETE FROM role 
                 WHERE role.title = '${role.delete}';`
            );
            console.log(`\nremoved ${role.delete} role from database along with any employees tied to that role.\n`);
            break;
        case 'Add new employee':
            roles = await getRoles(client);
            employees = await getEmployees(client, 1);
            employee = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the employees first name?',
                    name: 'firstName',
                },
                {
                    type: 'input',
                    message: 'What is the employees last name?',
                    name: 'lastName',
                },
                {
                    type: 'list',
                    choices: roles,
                    message: 'What is the employees role?',
                    name: 'role',
                },
                {
                    type: 'list',
                    choices: employees,
                    message: 'Who is the employees manager?',
                    name: 'manager',
                },
            ]);
            roleId = await getRoleId(client, employee.role);
            let managerId = await getManagerId(client, employee.manager);
            await client.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES
                    ('${employee.firstName}', '${employee.lastName}', ${roleId}, ${managerId});`
            );
            console.log(`\nAdded new employee ${employee.firstName} ${employee.lastName} to database.\n`);
            break;
        case 'Delete an employee':
            employees = await getEmployees(client);
            const deleteEmployee = await inquirer.prompt([
                {
                    type: 'list',
                    choices: employees,
                    message: 'Select an employee to delete',
                    name: 'name',
                }
            ]);
            await client.query(
                `DELETE FROM employee 
                WHERE CONCAT(employee.first_name, ' ', employee.last_name) = '${deleteEmployee.name}';`
            );
            console.log(`\nRemoved ${deleteEmployee.name} from database.\n`);
            break;
        case 'Update employee role':
            employees = await getEmployees(client);
            roles = await getRoles(client);
            const updateEmployee = await inquirer.prompt([
                {
                    type: 'list',
                    choices: employees,
                    message: 'Select an employee to update:',
                    name: 'name',
                }
            ]);
            const updateRole = await inquirer.prompt([
                {
                    type: 'list',
                    choices: roles,
                    message: `Select new role for ${updateEmployee.name}:`,
                    name: 'name',
                },
            ]);
            roleId = await getRoleId(client, updateRole.name);
            await client.query(
                `UPDATE employee
                SET role_id = ${roleId}
                WHERE CONCAT(employee.first_name, ' ', employee.last_name) = '${updateEmployee.name}';`
            );
            console.log(`\nUpdated ${updateEmployee.name} to have new role ${updateRole.name}.\n`);
            break;
        default:
            console.log(`\nHave not yet created code for this case :)\n`);
            break;
    };
}

async function getDepartments(client) {
    let departments = await client.query(
        `SELECT department.name FROM department;`
    );
    departments = departments.rows.map((row) => row.name);
    return departments;
};

async function getRoles(client) {
    let roles = await client.query(`SELECT role.title FROM role;`);
    roles = roles.rows.map((row) => row.title);
    return roles;
};

async function getRoleId(client, roleTitle) {
    let roleId = await client.query(
        `SELECT role.id FROM role
         WHERE role.title = '${roleTitle}'`
    );
    roleId = roleId.rows[0].id;
    return roleId;
}

async function getEmployees(client, noneOption) {
    let employees = await client.query(
        `SELECT CONCAT(employee.first_name, ' ', employee.last_name)
         FROM employee;`
    );
    employees = employees.rows.map((employee) => employee.concat);
    if (noneOption) {
        employees.unshift('none');
    };
    return employees;
};

async function getManagerId(client, managerName) {
    let managerId = await client.query(
        `SELECT employee.id FROM employee
         WHERE CONCAT(employee.first_name, ' ', employee.last_name) = '${managerName}'`
    );
    managerId = managerId.rowCount > 0 ? managerId.rows[0].id : null;
    return managerId;
}





module.exports = pgQuery;