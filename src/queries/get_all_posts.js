const db_Connection = require('../database/db_connection');

const get_all_posts = (callback) => {
    db_Connection.query('SELECT * FROM recipe', (err, result) => {
        if (err) {
            callback(err);
       } else {
            callback(null, result);
           }
    });
}
module.exports = get_all_posts;