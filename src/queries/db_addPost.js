const db_connection = require('../database/db_connection');

const db_addPost = (object, callback) => {

    const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    const sqlInsert = {
        text: "INSERT INTO recipe (content , user_id , date) VALUES ($1,$2,$3)",
        values: [object.content, '1', currentDate]
    };

    db_connection.query(sqlInsert, (err, result) => {
        if (err)
            callback(err);
        else
            callback(null, result);

    });
}

module.exports = db_addPost;