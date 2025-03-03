const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {

    try{ 
        const {name,email,password}=req.body;
        const user = new User({name,email,password});
        await user.save();
        res.status(201).send({message:'User created successfully',user});
       }catch(err){
        res.status(500).send({message:err.message});
    }

});