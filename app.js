//  create server
const express = require("express");
const app = express();
const http = require("http");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const server = http.createServer(app);

app.use(bodyparser.json());
// connect with database
// import routes
let uri = "mongodb://127.0.0.1:27017/blog"
mongoose.set("strictQuery",false);
mongoose.connect(uri).then(()=>{
    console.log("database connected")
})

app.use("/v1/api",require("./routes/api"));

server.listen(4000,()=>{
    console.log("servre is runing at 4000 !");
})