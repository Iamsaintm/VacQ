const express = require('express');
const dotenv = require('dotenv');
const res = require('express/lib/response');
const cookieParser = require('cookie-parser'); 
const mongoSanitize=require('express-mongo-sanitize')
const helmet=require('helmet');
const xss=require('xss-clean')
const rateLimit=require('express-rate-limit');
const hpp=require('hpp');
const cors=require('cors');

// Route files
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');

const connectDB = require('./config/db');
//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();
const app=express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Rate Limiting
const limiter=rateLimit({
    windowsMs:10*60*1000,//10 mins
    max:10
});
app.use(limiter);

//Prevent http param pollutions
app.use(hpp());

//Enable CORS
app.use(cors());

//Mount routers
app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/appointments',appointments);
app.use('/api/v1/auth',auth);

const PORT=process.env.PORT || 3000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandleRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});