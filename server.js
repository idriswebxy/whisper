const express = require("express");
// const connectDB = require("./config/db");
// const cors = require("cors");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MONGODB_URI");



const app = express();


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://heroku_zd227265:fv77ncl95kaas6eekjihm0jo91@ds241308.mlab.com:41308/heroku_zd227265", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log("MongoDB Connected...");
  } 
  catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};


// app.use(cors());

connectDB();

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
