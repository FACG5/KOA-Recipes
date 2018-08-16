const db_connection = require('./db_connection');
const fs = require('fs');
const path = require('path');

const reBuild = () => {
    const file = fs.readFileSync(path.join(__dirname, 'db_build.sql')).toString();
    db_connection.query(file, (err, result) => {
        if (err) {
            console.log("There Is Error in Building DATABASE");
        } else {
            console.log("Done || ReBuild The DATA BASE ");
        }
    });
}

module.exports = reBuild;
