const test = require('tape');
const { hashPassword }  = require('../handler/handleSignUpPage');

test("Test hash password" , (t) =>{
    hashPassword("Asmaa123456", (err, res) => {
        if (err) t.equal(err, "error should be null");
        t.equal(res.substring(0, 4), "$2a$");
        t.end();
    });
});