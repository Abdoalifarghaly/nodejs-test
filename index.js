const express = require("express");
require("dotenv").config();

const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT ;
// const path = require("path");
const usersRoute = require("./routes/users.routes.js");
const postsRoute = require("./routes/post.routes.js");
// const mongoose = require("mongoose");
//medileware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoute);
app.use("/posts",postsRoute)
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use((err,req, res, next) => {
  res.status(404).send(
    {
      statuesCode:err.statusCode || 404,
      messge:err.message||"not found",
      errors:[]
    }
  )
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "internal server error" });
});
mongoose
.connect(process.env.DB_URL)
.then(() => {
console.log("connected to db sucsssuly" );

}).catch((err)=>{
  console.log("faild to connect to db ",err)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
