const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/', (req, res) => {
    // try catch block is checking
    // for errors without stopping the server 
    // from running if there is an error in the code 
    try {

    }catch(err) {
        console.log(err);
    }
})