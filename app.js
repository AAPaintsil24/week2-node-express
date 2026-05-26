const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// request logger (bonus)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// static website (serves public/index.html at "/")
app.use(express.static("public"));

// POST /user
app.post("/user", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "name and email are required"
    });
  }

  res.send(`Hello, ${name}!`);
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  res.send(`User ${id} profile`);
});

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});