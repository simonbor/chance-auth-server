'use strict';
const http = require('http');
const DbContext = require('./contexts/db-context/db-context');

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

const router = require('./router');
const server = http.createServer();

server.on('request', async (req, res) => {
    // cors block
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    // cors trick
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const jsonString = await router.route(req, res);
    res.end(JSON.stringify(jsonString));
});

DbContext.initContext();    // init database (mssql, postgres)

server.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}/`);
});
