//const handleSignUpPage = require('./handler/');
const addPost = require('./handler/add_post');

const {handleAddUser,handlerSignupPage} = require('./handler/handleSignUpPage');

const { handleOtherFiles, handlePageNotFound, handleHomePage } = require('./handler/functions');

const router = (request, response) => {
    const endpoint = request.url;

    
    const method = request.method;

    if (endpoint === '/home') {
        handleHomePage(request, response);
    } else if (endpoint.includes('public')) {
        handleOtherFiles(request, response);
    }
    else if(endpoint === '/sign_up' && method === 'POST'){
        handleAddUser(request,response);
    }
    else if(endpoint ==='/sign_up' && method ==='GET'){
        handlerSignupPage(request,response);
    }
    else if (endpoint === '/sign_in' && method ==='GET') {
        // addPost(request, response);
    }
    else if (endpoint === '/add_post' && method ==='POST') {
        addPost(request, response);
    } else {
        handlePageNotFound(request, response);
    }
};


module.exports = router;