const http = require('http');
const router = require('./router');
const port = process.env.PORT ||7000;
const host = process.env.hostname || 'localhost';


const server = http.createServer(router);


server.listen(port,()=>{
    console.log(`Check Our Website http://${host}:${port}`);

})
