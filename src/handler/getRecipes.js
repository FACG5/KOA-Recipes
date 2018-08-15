const get_all_posts = require('../queries/get_all_posts');

const getRecipes = (request, response) => {
    get_all_posts((err, result) => {
        if (err) {
            response.writeHead(200, 'applcation/javascript');
            response.end(JSON.stringify({ 'err': "There Is Error In Reading Posts" }));

        } else {
            response.writeHead(200, { "content-type": "application/javascript" });
            response.end(JSON.stringify({ "result": result.rows }));

        }
    });

}
module.exports = getRecipes;

