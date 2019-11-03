const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const mongo = require("mongodb").MongoClient



const app = express();

app.use(cors());

mongo.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, (err, client) => {
if (err) {
  console.error(err)
  return
}
  console.log("MongoDB Connected...");
  
})


// connectDB();


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
