//const handleSignUpPage = require('./handler/');
const addPost = require('./handler/add_post');
const getRecipes = require('./handler/getRecipes')
const { handleOtherFiles, handlePageNotFound, handleHomePage } = require('./handler/functions');

const router = (request, response) => {
    const endpoint = request.url;

    if (endpoint === '/home') {
        handleHomePage(request, response);
    } else if (endpoint.includes('public')) {
        handleOtherFiles(request, response);
    } else if (endpoint === '/signup') {
        handleSignUpPage(request, response);
    } else if (endpoint === '/add_post' && request.method === 'POST') {
        addPost(request, response);
    } else if (endpoint === '/add_post' && request.method === 'GET') {
        getRecipes(request, response);

    } else {
        handlePageNotFound(request, response);
    }
};


module.exports = router;