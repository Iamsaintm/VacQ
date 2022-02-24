const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');
const connectDB = require('./config/db');

//route file
const hospitals = require("./routes/hospitals");
const auth = require("./routes/auth");

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

const app=express();

//add body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/auth", auth);

const PORT=process.env.PORT || 3000;
const server=app.listen(PORT, console.log('Server running in', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unchandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.massage}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});