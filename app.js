const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
var cors = require("cors");
const path = require("path");

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

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:8082/api/books"
  );
  next();
});

app.use(express.static(path.join(__dirname, "client", "build")));

const port = process.env.PORT || 8082;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
