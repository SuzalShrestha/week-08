const http = require('http');
const port = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    
    <body>
        <h1>Hello there!</h1>
    </body>
    
    </html>`);
    res.end();
});
server.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});