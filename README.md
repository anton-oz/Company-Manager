# Company Manager

## Description

This application is a CLI for interacting with a database containing information about a company. I built this app to gain experience working with postgreSQL and to learn how to use the information from a database in an application. This app streamlines interacting with a database because the user only needs to respond to inquirer prompts to get the information they need. 

## Installation

To get this project up and running you will need to have [postgres](https://www.postgresql.org/download/)  (When installing postgres make sure that pgAdmin4 is also installed) and [node.js](https://nodejs.org/en/download/package-manager) installed. If you have both installed navigate to the directory containing __index.js__ and enter `npm i` into terminal to install dependencies. That's all for installation!

## Usage

To use the app you will first want to create and seed the database. Open pgAdmin 4 and navigate to the localhost server. Right click on the database tab and create a new database called *company_info*. Ensure that you have the *company_info* database selected and open a new query tab. Use the prewritten queries from [schema.sql](./db/schema.sql) to create the tables, then use the prewritten queries from [seed.sql](./db/seed.sql) to seed the tables with the starter info.

Once you have seeded the database, 



## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.

## License

The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

---

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![GitHub License](https://img.shields.io/github/license/anton-oz/testing-things)


![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

## Features

If your project has a lot of features, list them here.

## How to Contribute

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them here.