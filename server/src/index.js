require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apodRoutes = require("./routes/apodRoutes");
const libraryRoutes = require("./routes/libraryRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "NASA APOD Explorer API running 🚀" });
});

// Routes
app.use("/api/apod", apodRoutes);
app.use("/api/library", libraryRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
