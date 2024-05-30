// TO DO
// Refactor all code that relates to 'company_info' database to work with included .sql files

const color = require("colors");

const inquirer = require("inquirer");

const {Pool} = require("pg");

//const createDb = require("./lib/createDb");


inquirer.prompt([
    {
        type: 'confirm',
        message: color.yellow.bold.bgBlack(`If you have any database named company_info, this app will delete all 
previous information for that database. Please confirm that you understand.`),
        name: 'continue'
    }
])
.then(async (answer) => {
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
            .then((option) => {
                if (option.selected === 'Quit Company Manager') {
                    return runningVariable = 0
                }
            })
        } 
    };
});