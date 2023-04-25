const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here
  let url=req.url;
  let ext=url.split(".")[1];
  let content;
   if(ext=="css"){
    content=fs.readFileSync("./assets/css/application.css","utf8");
    res.writeHead(200, { 'Content-Type': 'text/css' });
    return res.end(content);
  }else if(ext=="jpg"){
    content=fs.readFileSync("./assets/images/dog.jpg");
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    return res.end(content);
  }
    content=fs.readFileSync("index.html","utf8");
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));