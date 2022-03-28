const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
//var cors = require("cors");
const path = require("path");

var corsMiddleware = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8082/api/books"); //replace localhost with actual host
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );

  next();
};

// Connect Database
connectDB();

const app = express();

// cors
//app.use(cors({ origin: true, credentials: true }));

app.use(corsMiddleware);

// routes
const books = require("./routes/api/books");
const { get } = require("config");

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use("/api/books", books);

app.use(express.static(path.join(__dirname, "client", "build")));

const port = process.env.PORT || 8082;

/*app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});*/

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // serve the static react app
  app.get(books, (req, res) => {
    // don't serve api routes to react app
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
  console.log("Serving React App...");
}

app.listen(port, () => console.log(`Server running on port ${port}`));
