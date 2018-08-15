const { errorPage500 } = require('./functions');
const addNewUser = require('../queries/postData');
const bcrypt = require("bcryptjs");
const fs = require('fs');
const path = require('path');

const hashPassword = (password, cb) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return cb(err);
        bcrypt.hash(password, salt, cb);
    })
};

const verify = (data) => {
    if (data["username"].toString().length === 0 ||
        data["password"].toString().length === 0 ||
        data["fname"].toString().length === 0 ||
        data["lname"].toString().length === 0
    ) return false;
    else return true;
};

const handleAddUser = (request, response) => {
    let allData = '';
    request.on('data', (chunk) => {
        allData += chunk;
    });

    request.on('end', () => {
        const data = JSON.parse(allData);

        if (verify(data)) {
            const { username, password, fname, lname } = data;
            hashPassword(password, (err, hashPass) => {
                if (err)
                    errorPage500(request, response);
                else {
                    addNewUser(username, hashPass, fname, lname, (err, res) => {
                        if (err) {
                            errorPage500(request, response);
                        }
                        else {
                            response.writeHead(200, { "content-type": "application/javascript" });
                            response.end(JSON.stringify({"result":"Done"}));

                        }

                    });
                }
            });
        }
    });
};

const handlerSignupPage = (request, response) => {
    fs.readFile(path.join(__dirname, '..', '..', 'public', 'sign_up.html'), (err, file) => {
        if (err) {
            errorPage500(request, response);
        } else {
            response.writeHead(200, { "content-type": "text/html" });
            response.end(file);
        }
    });
};

module.exports = { handleAddUser, handlerSignupPage, hashPassword };