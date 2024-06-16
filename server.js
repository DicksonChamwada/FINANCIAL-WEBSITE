const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Creating middleware
app.use(cors());
app.use(express.json());

// Connecting to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.error("Could not connect to MongoDB", error));

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Serve the HTML file
app.get("/", (req, res) => {
  app.use(express.static(path.join(__dirname, "../public")));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});