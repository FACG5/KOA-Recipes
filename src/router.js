//const handleSignUpPage = require('./handler/');
const addPost = require('./handler/add_post');

const { handleOtherFiles, handlePageNotFound, handleHomePage } = require('./handler/functions');

const router = (request, response) => {
    const endpoint = request.url;
    console.log(request.method);
    if (endpoint === '/home') {
        handleHomePage(request, response);
    } else if (endpoint.includes('public')) {
        handleOtherFiles(request, response);
    }
    else if (endpoint === '/signup') {
        handleSignUpPage(request, response);
    } else if (endpoint === '/add_post' && request.method==='POST') {
        addPost(request, response);
    } else {
        handlePageNotFound(request, response);
    }
};


module.exports = router;