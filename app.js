//  create server
const express = require("express");
const app = express();
const http = require("http");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const server = http.createServer(app);
require('dotenv').config();
var cors = require('cors')
const rateLimit = require("express-rate-limit");
const mongoSanitize = require('express-mongo-sanitize');

 
app.use(cors())
app.use(bodyparser.json());

app.use(mongoSanitize());

mongoose.set("strictQuery",false);
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("database connected")
});

app.use(express.static(__dirname + '/public'));

app.use(rateLimit({
    windowMs: 15*60*1000,
    max:100,
    message:"your IP has been blocked!"
}))



app.use("/v1/api",require("./routes/api"));

app.use("*",(req,res)=>{
    res.json({
        error:"can not found this route!"
    })
});

server.listen(4000,()=>{
    console.log("servre is runing at 4000 !");
    // console.log(process)
})

// @import '~bootstrap/dist/css/bootstrap.min.css';