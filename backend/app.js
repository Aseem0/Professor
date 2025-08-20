var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRoutes");
var adminRouter = require("./routes/adminRoutes");
var questionRouter = require("./routes/questionRoutes");
var cors = require("cors");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/userRoutes", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/questions", questionRouter);
main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Professor_Database",
    })
    .then((data) => {
      console.log("Connected to MongoDB", data.connection.name);
    });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = app;
