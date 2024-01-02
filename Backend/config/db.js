
// require("dotenv").config()
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MongoDB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to MongoDB Atlas');
// })
// .catch((err) => {
//   console.error('Error connecting to MongoDB Atlas:', err.message);
// });

// module.exports = mongoose.connection;



require("dotenv").config()

const mongoose = require("mongoose")

mongoose.connect(process.env.MongoDB_URI, {})
    .then(()=>{
        console.log("successfully connected to atlas");
    })
    .catch((err)=>{
        console.log(err);
    })
