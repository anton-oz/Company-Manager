const {Client} = require("pg");
const tableMaker = require("./tableMaker");
const inquirer = require("inquirer");


const pgQuery = async (answer, client) => {
    let res;
    let department;
    let departments;
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
            const role = await inquirer.prompt([
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
                    name: 'department'
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
        default:
            console.log('Have not yet created code for this case :)');
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



module.exports = pgQuery;