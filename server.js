const http = require("http");
const PORT = 8080;
const app = require("./app");

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}`);
});
