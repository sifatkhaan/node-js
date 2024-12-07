const http = require('http');
const fs = require('fs');
const _ = require('lodash')
const server = http.createServer((req, res) => {

//lodash

const num = _.random(0, 20)

console.log(num)
const greet = _.once(()=>{
    console.log('hellow lodash')
})
   greet()
   
    res.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusCode =200;
            break;
        case '/about':
            path += 'about.html'
            res.statusCode =200;
            break;
        case '/about-me':
            res.statusCode =301;
            res.setHeader('Location', '/about')
            res.end()
            break;
        default:
            path += '404.html'
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.end(data)
        }
    })
});

server.listen(3001, 'localhost', () => {
    console.log('listening for request on port 3001')
})