const { sendFormPage } = require("./routes");
const { parseBody } = require("./parse-body");
let server;

/******************************************************************************/
/******************* DO NOT CHANGE THE CODE ABOVE THIS LINE *******************/

// Your code here
let port = 5000;
const http = require("http");
server = http.createServer((req, res) => {
    let body = "";
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        req.body = parseBody(body);
        console.log(parsed);
    });
    console.log(`${req.method} ${req.url}`);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/x-www-form-urlencoded");

    sendFormPage(req, res);

});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/******************************************************************************/
/******************* DO NOT CHANGE THE CODE BELOW THIS LINE *******************/

module.exports = { server };