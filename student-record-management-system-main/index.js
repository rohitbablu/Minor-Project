const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/route.js");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

dotenv.config({ path: ".env" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve React build
app.use(express.static(path.join(__dirname, "dist")));

// API routes
app.use("/api", router);

// Catch-all for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
