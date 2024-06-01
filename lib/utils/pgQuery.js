const {Client} = require("pg");
const tableMaker = require('./tableMaker');


const pgQuery = async (answer, client) => {
    let res;
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
            // res = await client.query('SELECT * FROM employee;');

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
    }
}

module.exports = pgQuery;