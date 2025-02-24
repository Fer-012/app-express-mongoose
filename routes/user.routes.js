const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Async function to get all users from the database
router.post('/', async (req, res) => {
    // Try-catch block is checking for errors without stopping the server
    try {
        const user = new User(req.body);
        await user.save(); // Save the user to the database
        // Await keyword is used to wait for the promise to be resolved
        res.status(201).send({ message: 'User created successfully', user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.get('/all',async (req,res)=>{
    try{
        const users = await User.find();
        res.send(users);
    }catch(err){
        res.status(500).send({message:err.message});
    }
});

router.get('/:name',async (req,res)=>{
    try{
        const name = req.params.name;
        const user = await User.findOne({name});
        if(user){
            res.status(200).send(user);
        }else{
            res.status(404).send({message:"User not found"});
        }
    }catch(err){
        res.status(404).send({message:err.message});
    }
});

router.put('/:name',async (req,res)=>{
    try{
        const name = req.params.name;
        const user = await
        User.findOneAndUpdate
        ({name},req.body,{new:true});
        if(user){
            res.status(200).send(user);
        }else{
            res.status(404).send({message:"User not found"});
        }
    }catch(err){
        res.status(404).send({message:err.message});
    }
})

// Exporting the router to be used in other files
module.exports = router;