const color = require("colors");
const inquirer = require("inquirer");
const {Client} = require("pg");
const tableMaker = require('./utils/tableGen')

require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: 'localhost',
});

module.exports = {
    startApplication: async () => {

        await client.connect();

        let runningVariable = 1;

        while (runningVariable === 1) {
            if (runningVariable === 1) {
                await inquirer.prompt([
                    {
                        type: 'list',
                        message: 'What would you like to do?',
                        choices: [
                            'View all departments', 
                            'View all roles', 
                            'View all employees', 
                            'Add new department', 
                            'Add new role', 
                            'Add new employee', 
                            'Update employee role',
                            'Quit Company Manager'
                        ],
                        name: 'selected'
                    }
                ])
                .then(async (option) => {
                    if (option.selected === 'Quit Company Manager') {
                        await client.end()
                        return runningVariable = 0
                    }
                    let res;
                    switch (option.selected) {
                        case 'Quit Company Manager':
                            await client.end();
                            return runningVariable = 0;
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
                })
            } 
        };
    }
};