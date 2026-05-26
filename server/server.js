require("dotenv").config();

const accommodationRoutes = require("./routes/accommodationRoutes");

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/accommodations", accommodationRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});