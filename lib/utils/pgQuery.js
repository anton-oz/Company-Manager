const {Client} = require("pg");
const tableMaker = require('./tableMaker');


const pgQuery = async (answer, client) => {
    if (answer === 'Quit Company Manager') {
        await client.end()
        return runningVariable = 0
    }
    let res;
    switch (answer) {
        case 'View all departments':
            res = await client.query('SELECT * FROM department');
            tableMaker(res);
            break;
        case 'View all roles':
            res = await client.query('SELECT * FROM role');
            tableMaker(res);
            break;
        case 'View all employees':
            res = await client.query('SELECT * FROM employee');
            tableMaker(res);
            break;
    }
}

module.exports = pgQuery;