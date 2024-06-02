const color = require("colors");
const inquirer = require("inquirer");

const client = require("./config/connection");
const pgQuery = require("./utils/pgQuery");

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
                            'Delete a department', 
                            'Add new role',
                            'Delete a role', 
                            'Add new employee', 
                            'Update employee role',
                            'Quit Company Manager'
                        ],
                        name: 'selected',
                    },
                ])
                .then(async (option) => {
                    if (option.selected === 'Quit Company Manager') {
                        await client.end();
                        return runningVariable = 0;
                    } else {
                        await pgQuery(option.selected, client);
                    }
                });
            }; 
        };
    },
};