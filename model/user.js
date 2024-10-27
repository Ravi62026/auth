const mongoose = require("mongoose")

// import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        default: null,
    },
 
    lastname: {
        type: String,
        default: null
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String,
    },

    token: {
        type: String
    }
})

module.exports = mongoose.model("users", userSchema)