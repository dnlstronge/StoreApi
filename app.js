require("dotenv").config();
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
  res.send("<h1>Store API</h1><a href='/api/v1/products'>Products Route</a>");
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// port

const port = process.env.PORT|| 3000

const start = async () => {
    try {
        // connect to database
        app.listen(port, console.log(`Listening on port: ${port}`))
        
    } catch (error) {
        
    }
}