const express = require('express');
const UserModel = require('../models/Users')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const fetchUserMware = require("../middleware/fetchUserMware")


const SECRET_KEY = process.env.SECRET_KEY // secret key wil we add to json web token

const Router = express.Router();
const { body, validationResult } = require('express-validator');


// Route: 1  ------ create an endpoint to register a user  : no login required -------
Router.post('/reguser', [
    // -------- must add validations using express-validator ------
    body('name', 'name must be atleast 3 chars').isLength({ min: 3 }),
    body('email', 'Email must be a valid email').isEmail(),
    body('password', 'password must be in between 6 to 20 chars').isLength({ min: 6, max: 20 })
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const { email, name, password } = req.body;                       // extract credentials from req.body
        const salt = await bcrypt.genSalt(10)                          // generate salt that will addedt to the hashing password
        const hashedPassword = await bcrypt.hash(password, salt)       // make hash of password we have entered
        const UserCreation = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        })
        const User = await UserCreation.save()

        const data = {
            user: {
                id: User.id
            }
        }
        const auth_token = await jwt.sign(data, SECRET_KEY)
        res.status(201).json({ auth_token, message: "user registered" })
    }
    catch (err) {
        res.status(404).send(err.message)
    }
})




// Route: 2  ------ create an endpoint to check if  a user with email exists  : no login required -------
Router.post('/checkuser', [
    body('email').isEmail()
], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const email = req.body.email
        // console.log(email);
        const User = await UserModel.findOne({ email: email })
        if (User) {
            res.status(200).send('User Exists')
        }
        res.status(404).json({ message: 'User Not Exists' })
    } catch (err) {
        console.log(err.message);
    }
})



// Route: 3  ------ create an endpoint to login a user with email and password  : no login required -------
Router.post('/login', [
    // -------- must add validations using express-validator ------
    body('email', 'Email must be a valid email').isEmail(),
    body('password', "password can't be blank be in ").isLength({ min: 1 })
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body
        const User = await UserModel.findOne({ email: email })
        if (User) {
            const compPass = await bcrypt.compare(password, User.password)
            if (compPass) {
                const data = {
                    user: {
                        id: User.id
                    }
                }
                const auth_token = await jwt.sign(data, SECRET_KEY)
                res.status(202).json({ auth_token, message: "user logged in" })
            }
            res.status(404).json({ error: "Email or password mismached, Please provide valid credentials" })
        }
        res.status(404).json({ error: "user does not exist" })


    } catch (err) {
        res.status(404).send(err.message)
    }
})



// Route: 4  ------ create an endpoint to get user details  : login required -------
Router.post('/getuser', fetchUserMware, async (req, res) => {

    try {
        const userId = req.user.id
        // console.log(req.user);
        const getUsers = await UserModel.findOne({ _id: userId }).select("-password")
        res.status(202).send(getUsers)
        // res.send("this is the endpoint to send all notes")
    } catch (err) {
        res.status(404).send(err.message)
    }
})

module.exports = Router