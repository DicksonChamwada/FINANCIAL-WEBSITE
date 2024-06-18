const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser")
const exp = require("constants");


// importing models
const Message = require('./models/Message')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;



// Creating middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "static")))

// Connecting to MongoDB 
mongoose.connect(MONGODB_URI, { 
  // useNewUrlParser: true, 
  // useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.error("Could not connect to MongoDB", error));


// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
});

// Routes
app.post("/api/send", async(req, res) => {
  try{
    const { name, email, message } = req.body

    // create a new message
    const newMessage = new Message({
      name,
      email, 
      message
    })

    await newMessage.save()

    // resposne
    res.status(200).json({ message: "Message sent successfully" })
  }
  catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});