const fs = require('fs');
const path = require('path');

const handleOtherFiles = (request,response) =>{
    const endpoint = request.url;
    const extension = endpoint.split('.')[1];
    const contentType = {
        html : 'text/html',
        css : 'text/css',
        js : 'application/javascript',
        json : 'application/javascript',
        icon : 'image/x-icon',
        jpg : 'image/jpg',
        png : 'image/png'
    };

    fs.readFile(path.join( __dirname, '..', '..', endpoint), (err, file) => {
        if(err){
            errorPage500(request,response);
        }else{
            response.writeHead(200, `Content-Type:${contentType[extension]}`);
            response.end(file);
        }
    });
};

const errorPage500 = (request,response) =>{
    fs.readFile(path.join( __dirname, '..', '..', 'public', 'error500.html'), (error,file) => {
        if(error){
            response.end(JSON.stringify(error));
        }else {
            response.writeHead(500, 'Content-Type: text/html');
            response.end(file);
        }
    });
};


const handlePageNotFound = (request,response) =>{
    fs.readFile(path.join( __dirname, '..', '..', 'public', 'error404.html'), (error, file) => {
        if(error) {
            errorPage500(request,response);
        }else {
            response.writeHead(404, 'Content-Type: text/html');
            response.end(file);
        }
    });
}

module.exports = { handleOtherFiles, errorPage500, handlePageNotFound };