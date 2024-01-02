// const express = require("express");
// const app = express();
// const cors = require('cors');
// const port = 3000;

// // MongoDB 
// require('./config/db');

// app.use(cors()); // Use CORS middleware

// const userRouter = require('./api/user');
// app.use('/user', userRouter);

// // CORS setup for specific routes or all routes
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });
const express = require('express')

const cors = require("cors")
//mongodb
require('./config/db')

const app =express();
const listen= 3000


// const bodyParser=require('body-parser')
const bodyParser=require("express").json;
app.use(bodyParser())

// app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes

// ... other middleware and routes ...

app.use(express.json());

const userRouter = require('./api/user');
app.use('/user', userRouter);
app.listen(listen,()=>{
    console.log(`server runnig ${listen}`);
})