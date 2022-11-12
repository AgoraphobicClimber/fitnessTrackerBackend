require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { COOKIE_SECRET } = process.env;
const routes = require("./routes");
const client = require("./db/client");
const PORT = 5000;
client.connect();

const app = express();

app.use(morgan("dev"));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());

app.use("/routes", routes);

app.use((error, req, res, next) => {
  res.status(500).send(error);
});

app.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}...`);
});
