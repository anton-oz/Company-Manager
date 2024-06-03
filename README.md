# Company Manager

## Description

This application is a CLI for interacting with a database containing information about a company. I built this app to gain experience working with postgreSQL and to learn how to use the information from a database in an application. This app streamlines interacting with a database because the user only needs to respond to inquirer prompts to get the information they need. 

## Installation

To get this project up and running you will need to have [postgres](https://www.postgresql.org/download/)  (When installing postgres make sure that pgAdmin4 is also installed) and [node.js](https://nodejs.org/en/download/package-manager) installed. If you have both installed navigate to the directory containing __index.js__ and enter `npm i` into terminal to install dependencies. That's all for installation!

## Usage

[__Walkthrough Video__](https://drive.google.com/file/d/1aUDXu2YepM9cE6U6g_JX3Da0OuQQOfNO/view?usp=sharing)

To use the app you will first want to create and seed the database. Open pgAdmin 4 and navigate to the localhost server. Right click on the database tab and create a new database called *company_info*. Ensure that you have the *company_info* database selected and open a new query tab. Use the prewritten queries from [schema.sql](./db/schema.sql) to create the tables, then use the prewritten queries from [seed.sql](./db/seed.sql) to seed the tables with the starter info.

Now that you have seeded the database, you are ready to use the app! To start the app navigate to the directory containing __index.js__ in the terminal and enter `npm start`. Respond to the prompts to interact with the datebase, and select 'Quit Company Manager' to exit the application.

## License

N/A
