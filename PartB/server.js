const http = require("http")
const url = require("url")
const fs = require("fs")
const utils = require("./modules/utils")
const message = require("./lang/en/en.json")

http.createServer(handleRequest).listen(8080);

function handleRequest(req, res) {
  let q = url.parse(req.url, true);
  if (q.pathname === "/getDate/") {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': "*"
    })
    res.end(`<span style="color: blue;">${utils.getMessage(q.query.name)} ${utils.getFullDate()}</span>`);
  } else if (q.pathname === "/writeFile/") {
    fs.appendFile("file.txt", q.query.text + "\n", (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    res.writeHead(200, {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(`{"message": ${message.SUCCESS}}`);
  } else if (q.pathname.includes("/readFile/")) {
    let filename = q.pathname.split("/")[2];
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, {
          "Content-Type": "text/json",
          "Access-Control-Allow-Origin": "*",
        }); 
        res.end(`{"message": ${message.FILE_NOT_FOUND}}`);
        return console.log(err);
      }

      res.writeHead(200, {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(`<div>${data}</div>`);
    });
  }

}

console.log("Server is running and listening!")