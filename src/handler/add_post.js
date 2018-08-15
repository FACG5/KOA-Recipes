const db_addPost = require('../queries/db_addPost');
const addPost = (request, response) => {
    let allData = '';

    request.on('data', (chunck) => {
        allData += chunck;
    });

    request.on('end', (err) => {
        if (err) {

            response.writeHead(200, { "content-type": "text/html" });
            response.end(JSON.stringify({ 'err': "There Is Error In Reading Post" }));

        } else {
            const final = JSON.parse(JSON.parse(allData));

            db_addPost(final, (err, result) => {
                if (err) {
                    response.writeHead(200, { "content-type": "application/javascript" });
                    response.end(JSON.stringify({ 'err': "There Is Error In Reading Post" }));
                }
                else {
                    response.writeHead(200, { "content-type": "application/javascript" });
                    response.end(JSON.stringify({ "result": "I Got Data" }));
                    console.log('The end')
                }
            });
        }
    });

}

module.exports = addPost;