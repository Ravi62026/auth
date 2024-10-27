require("dotenv").config()

const express = require('express')
const app = express();

require("./config/database").connect()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// import model

const USer = require('./model/user');

app.get('/', (req, res) => { 
    res.send("<h1>JAY BABA PANCHBADAN</h1>")
})

app.post('/signup', async (req, res) => {

    try {

        // Collect all information

        const {firstname, lastname, email, password} = req.body

         // Check all field are filled, no one is empty

        if(!(email && password && firstname && lastname)) {
            res.status(400).send("All the field are required")
        }

        // Check for Existing user

        const extUSer = await USer.findOne(email)

        if(extUSer) {
            res.status(400).send("User Alredy Exists")
        }

        // Encrypt Password

        const myEncryptPassword = bcrypt.hash(password, 10);

        // create a new entryin database

        const newUser = await USer.create({
            firstname,
            lastname,
            email,
            myEncryptPassword
        })

        // Create a token and send it to user, jsonwebtoken

        const token = jwt.sign({
            is: newUser._id , email
        }, 'shhhhh', {expiresIn: '2h'})

        newUser.token = token
        // don't want to send the password
        newUser.password = undefined

        res.status(200).json(newUser)
        
    } catch (error) {
        console.log(error);
        console.log("Error in response route");
        
    }

})

app.post('/login', async (req, res) => {
    try {
        // collect info from body

        const {email, password} =  req.body

        if(!(email, password)) {
            res.status(400).send("Email and Password is required")
        }

        const extUSer = User.findOne(email)

        if(!extUSer) {
            res.status(400).send("User not exist, Signup First")
        }

        if(extUSer && (await bcrypt.compare(password, extUSer.password))) {
            const token = jwt.sign({id: extUSer._id, email}, 'shhhhh', {expiresIn:'2h'})

            extUSer.password = undefined
            extUSer.token = token

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }

            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                extUSer
            })
        }

        res.sendStatus(400).send("Invalid Credentials")
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = app;