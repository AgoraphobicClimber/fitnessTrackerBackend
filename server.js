const http = require ('http');
const PORT = 8080;
const express = require("express");
const morgan = require("morgan");
const app = require ('./app')

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}`)
  })