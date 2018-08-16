const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const secret = 'A7QMEsxejehr9kY4dqz6qIrtSUzLT8Fd';

const handleOtherFiles = (request, response) => {
    const endpoint = request.url;
    const extension = endpoint.split('.')[1];
    const contentType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        json: 'application/javascript',
        icon: 'image/x-icon',
        jpg: 'image/jpg',
        png: 'image/png'
    };

    fs.readFile(path.join(__dirname, '..', '..', endpoint), (err, file) => {
        if (err) {
            errorPage500(request, response);
        } else {
            response.writeHead(200, `Content-Type:${contentType[extension]}`);
            response.end(file);
        }
    });
};

const errorPage500 = (request, response) => {
    fs.readFile(path.join(__dirname, '..', '..', 'public', 'error500.html'), (error, file) => {
        if (error) {
            response.end(JSON.stringify(error));
        } else {
            response.writeHead(500, 'Content-Type: text/html');
            response.end(file);
        }
    });
};


const handlePageNotFound = (request, response) => {
    fs.readFile(path.join(__dirname, '..', '..', 'public', 'error404.html'), (error, file) => {
        if (error) {
            errorPage500(request, response);
        } else {

        }
    });
}
const handleHomePage = (request, response) => {
    if (checkToken(request, response)) {

        fs.readFile(path.join(__dirname, '..', '..', 'public', 'home.html'), (err, file) => {
            if (err) {
                handlePageNotFound(request, response);
            } else {
                response.writeHead(200, { "content-type": "text/html" });
                response.end(file);

            }

        })
    }
    ;
}

const checkToken = (request, response) => {
  const cookies = checkCookie(request, response);
    if (cookies) {
        return jwt.verify(cookies.jwt, secret, function (err, decoded) {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    } else {
        errorPage500(request, response);

    }
}
const checkCookie = (request, response) => {
    if (request.headers.cookie) {
        return cookie.parse(request.headers.cookie);
    } else { return null; }
}
module.exports = { handleOtherFiles, errorPage500, handlePageNotFound, handleHomePage };
