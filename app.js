const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
var cors = require("cors");
const path = require("path");

//CORS middleware
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

// routes
const books = require("./routes/api/books");

const app = express();

// cors
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use("/api/books", books);

app.use(corsMiddleware);

app.use(express.static(path.join(__dirname, "client", "build")));

const port = process.env.PORT || 8082;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
