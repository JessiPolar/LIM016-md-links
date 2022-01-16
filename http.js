//#! / usr / bin / env nodo
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const http = require('http');

const options = {
    hostname: 'localhost',
    port: 80,
    path: '/',
    method: 'get'
};

const rep = http.request(options, res => {
    console.log(`status code: ${res.statusCode}`);
    console.log('Headers: %j', res.headers);

    let body = '';
    res.on('data', chunk => {
        body += chunk;
    });

    res.on('end', () => {
        console.log('\n\nResultados: ')
        console.log(body);
    });
});
    req.on('error', err => {});
    req.end();

