const get_all_posts = require('../../queries/get_all_posts');
const db_build = require('../db_bulid');
const addPost = require('../../queries/db_addPost');
const tape = require('tape');
const router = require('../../router');
const supertest = require('supertest');

tape('test get Data From DATA BASE ', (t) => {
    db_build();
    get_all_posts((err, result) => {
        t.equal(err, null, "The Error Should Be Null ");
        t.ok(result.rows.length > 0, "There Result Should be Larger Than 0");
        t.ok(result.rows.length === 1, "There Result Should be equal 1");
        t.end();
    });

});

tape('Test insert row in database ', (t) => {
    db_build();
    const object = {
        content: "RAFAH",
    }
    addPost(object, (err, result) => {
        t.equal(err, null, "The Error Should Be Null");
        t.ok(result.rows.length === 0, "The Result Should Equal Zero");
        get_all_posts((err, result) => {
            t.equal(err, null, "The Error Should Be Null ");
            t.ok(result.rows.length > 0, "There Result Should be Larger Than 0");
            t.ok(result.rows.length === 2, "There Result Should be equal 1");
            t.end();
        });
    });
    
});

