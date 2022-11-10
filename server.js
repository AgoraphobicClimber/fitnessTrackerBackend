const http = require("http");
const app = require("./app");
const client = require("./db/client");
const { PORT = 5000 } = process.env;

const server = http.createServer(app);
client.connect()
server.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}...`);
});