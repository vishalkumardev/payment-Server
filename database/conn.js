const mongoose = require('mongoose');
const Database =process.env.HOST;

mongoose.connect(Database,{
    
}).then(() => {
    console.log("connection succesful")
}).catch((err) => {
    console.log(err)
});