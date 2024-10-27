const mongoose = require('mongoose')

const {MONGO_URL} = process.env

exports.connect = () => {
    
    mongoose.connect (MONGO_URL)
    .then(console.log("DB Connection Sucess"))
    .catch(error => {

        console.log("DB Connection Failed");
        console.log(error);
        process.exit(1)

    })
}