const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
var cors = require("cors");
const path = require("path");

// Connect Database
connectDB();

const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin," * "");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers," * "Content-Type");
  next();
});

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
  app.get(/^\/(?!api).*/, (req, res) => {
    // don't serve api routes to react app
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
  console.log("Serving React App...");
}

app.listen(port, () => console.log(`Server running on port ${port}`));
