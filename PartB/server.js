const http = require("http");
const url = require("url");
const fs = require("fs");
const utils = require("./modules/utils");
const message = require("./lang/en/en.json");
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

class Server {
  main() {
    http.createServer(Server.handleRequest).listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  }

  static handleRequest(req, res) {
    let q = url.parse(req.url, true);
    if (q.pathname === "/getDate/") {
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(
        `<span style="color: blue;">${utils.getMessage(
          q.query.name
        )} ${utils.getFullDate()}</span>`
      );
    } else if (q.pathname === "/writeFile/") {
      fs.appendFile("file.txt", q.query.text + "\n", (err) => {
        if (err) {
          console.error(err);
          console.log("there was an error writing the file");
          return;
        }
        console.log("The file has been saved!");
        res.writeHead(200, {
          "Content-Type": "text/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(`{"message": ${message.SUCCESS}}`);
      });
    } else if (q.pathname.includes("/readFile/")) {
      let filename = q.pathname.split("/")[2];
      fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
          res.writeHead(404, {
            "Content-Type": "text/json",
            "Access-Control-Allow-Origin": "*",
          });
          res.end(`{"message": ${message.FILE_NOT_FOUND + filename}}`);
          return console.log(err);
        }

        res.writeHead(200, {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
        });
        let output = data.replace(/\n/g, "<br>");
        res.end(`<div>${output}</div>`);
      });
    }
  }
}

const server = new Server();
server.main();