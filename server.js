const express = require('express');
const dotenv = require('dotenv');
const res = require('express/lib/response');
const cookieParser = require('cookie-parser'); 

// Route files
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');

const connectDB = require('./config/db');
//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Body parser
const app=express();

app.use(express.json());
app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/appointments',appointments);
app.use('/api/v1/auth',auth);
app.use(cookieParser());

const PORT=process.env.PORT || 3000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandleRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});