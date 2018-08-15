const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env');


if (!process.env.DB_URL)
    throw new Error('Cant Found The DB URL ');

const params = url.parse(process.env.DB_URL);
const [username, password] = params.auth.split(':');

const options = {
    host: params.hostname,
    port: params.port,
    user: username,
    password,
    database: params.pathname.split('/')[1],
    max: process.env.MAX_DB_CONNECTIONS || 2,
    ssl: process.env.host !== 'localhost'
};
console.log(options);
module.exports = new Pool(options);


