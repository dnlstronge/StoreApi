require("dotenv").config()
// async error


const express = require("express");
const app = express();

// error handlers: 
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found.js");

// json middleware: 
app.use(express.json());

// test route: 

app.get("/", (req, res) => {
    res.send("<h1>Store API</h1>")
})