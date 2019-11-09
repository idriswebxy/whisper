const express = require("express");
// const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("MONGODB_URI");


const app = express();


app.use(cors());

const url = "mongodb://tobi:l0c0m0c0@ds141228.mlab.com:41228/heroku_n4jj56l3"

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, console.log("MongoDB Connected..."))


app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

app.use(express.static(path.join(__dirname, "client/build")));


if (process.env.NODE_ENV === 'production') {

  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
