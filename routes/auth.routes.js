const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

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

router.post('/login', async (req, res) => {

    try{
        const {email,password}=req.body;
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).send({message:'User not found'});
        }
        const isHavePassword = await user.comparePassword(password);
        if(!isHavePassword){
            return res.status(400).send({message:'Invalid credentials'});
        }
        const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET);
        res.status(200).send({message:'User logged in successfully',token});
    }catch(err){
        res.status(500).send({message:err.message});
    }    
 });

module.exports = router;