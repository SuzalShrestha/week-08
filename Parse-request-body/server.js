const { sendFormPage } = require("./routes");
const { parseBody } = require("./parse-body");

/******************************************************************************/
/******************* DO NOT CHANGE THE CODE ABOVE THIS LINE *******************/

// Your code here
let port = 5000;
const http = require("http");
const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });
  req.on("end", () => {
    let prasedBody = parseBody(body);
    req.body = prasedBody;
    console.log(req.body);
  });
  console.log(`${req.method} ${req.url}`);
  sendFormPage(req, res);
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/******************************************************************************/
/******************* DO NOT CHANGE THE CODE BELOW THIS LINE *******************/

module.exports = { server };
