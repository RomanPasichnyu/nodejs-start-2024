console.log('test work?');


const http = require('node:http');

http.createServer((req, res) => {
    res.end('hello world\n');
}).listen(8000, 'localhost', () => {
    console.log('Server running at http://localhost:8000');
});

