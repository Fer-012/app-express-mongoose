const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: 'User created successfully', user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


router.get('/:name', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


router.put('/:name', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true }
        );
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


router.delete('/:name', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ name: req.params.name });
        if (user) {
            res.status(200).send({ message: 'User deleted successfully' });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
