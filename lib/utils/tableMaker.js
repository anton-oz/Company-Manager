const Table = require('cli-table3');

// takes in object array from pg and returns formatted table in console
const tableMaker = (postgresQuery) => {
    const table = new Table({
        head: postgresQuery.fields.map((fields) => fields.name),
        style: {
            head: [],
            border: [],
        },
    });
    postgresQuery.rows.forEach(row => {
        table.push(Object.values(row));
    });
    return console.log(table.toString() + '\n');
};

module.exports = tableMaker;