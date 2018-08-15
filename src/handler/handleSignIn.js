const fs = require('fs');
const path = require('path');
const getData = require('../queries/getData.js');
const bcrypt = require("bcryptjs");
const { parse } = require('cookie');
const { sign, verify } = require('jsonwebtoken');

const SECRET = 'A7QMEsxejehr9kY4dqz6qIrtSUzLT8Fd';

const comparePass = (password, hash, cb) => {
    bcrypt.compare(passwprd, has, (err, res) => {
        if (err) return cb(new Error("Error"));
        cb(null, res)
    })
};

const handleSignIn = (request, response) => {
    fs.readFile(path.join(__dirname, '..', '..', 'public', 'sign_in.html'), (err, file) => {
        if (err) { errorPage500(request, response) }
        else {
            response.writeHead(200, { "content-type": "text/html" });
            response.end(file);
        }
    })
};

const signInPost = (request, response) => {
    let data = '';
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on('end', () => {
        const object = JSON.parse(data);

        getData(object["username"], (err, result) => {
            if (err) {

                response.writeHead(200, { "content-type": "application/javascript" });
                response.end(JSON.stringify({ err: "There Is Error In Reading Post" }));
            } else {
                if (result.rowCount > 0) {
                    bcrypt.compare(object["password"], result.rows[0].password, (err, result1) => {
                        console.log(result);
                        if (result1) {
                            const data = {
                                username: object["username"]
                            };
                            const cookie = sign(data, SECRET);
                            response.writeHead(200, { 'set-cookie': `jwt=${cookie}; ` });
                            response.end(JSON.stringify({ "result": "pass" }));
                        } else {
                            response.writeHead(200, { "content-type": "application/javascript" });
                            response.end(JSON.stringify({ 'err': "There Is Error In Reading Post" }));
                        }
                    });
                }



            }
        });


    });
};


module.exports = { handleSignIn, signInPost };