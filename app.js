require("dotenv").config();
// async error
require("express-async-errors")


const express = require("express");
const app = express();
const connectDB = require("./db/connect.js")
const productsRouter = require("./routes/products")

// error handlers:
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found.js");

// json middleware:
app.use(express.json());

// test route:

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>Products Route</a>");
});
app.use("/api/v1/products", productsRouter)
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// port

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    // connect to database
    app.listen(port, console.log(`Listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();