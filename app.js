const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { COOKIE_SECRET } = process.env;
const routes = require('./routes')

require("dotenv").config();
const app = express();


app.use(morgan("dev"));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
app.use('/text',(req,res)=>{
  res.send("hje;o")
})
app.use("/routes", routes);




app.use((error, req, res, next) => {
  res.status(500).send(error);
});

module.exports = app;


