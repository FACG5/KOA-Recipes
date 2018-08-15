const dbConnection = require('../database/db_connection');

const addNewUser = (username, password, fname, lname, cb) =>{
    const sql = {
        text: "INSERT INTO users(username,password,Fname,Lname) VALUES ( $1, $2, $3, $4 );",
        values : [username, password, fname, lname]
    };
    dbConnection.query( sql, (err,res) => {
        if(err) cb(err);
        else cb(null, res.rows);
        });
};

module.exports = addNewUser ;
