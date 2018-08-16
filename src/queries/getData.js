const db_connection= require ("../database/db_connection.js");
const getData= (username,cb )=>{


    const sql = {
        text:'SELECT * FROM users WHERE username = $1;',
        values:[username]
    };
    db_connection.query(sql, (err, res)=>{
       if(err) {
           return cb(err);
       }
       else {
           cb(null, res);
       }
    })
}
module.exports= getData ;