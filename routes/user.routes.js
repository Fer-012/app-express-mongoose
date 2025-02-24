const express = require('express');
const User = require('../models/user');
const router = express.Router();

//async function to get all users from the database and cause there await keyword is used 
router.post('/',async (req, res) => {
    // try catch block is checking
    // for errors without stopping the server 
    // from running if there is an error in the code 
    try {
        const user = new User(req.body)
        await user.save(); // save the user to the database 
        //await keyword is used to wait for the promise to be resolved
        res.status(201).send({message:'User created successfully'},user);
    }catch(err) {
        res.status(500).send({message:err});
    }
})