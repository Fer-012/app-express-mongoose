const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const UserRoute = require('./routes/user.routes');
const PORT= process.env.PORT || 3000;
app.use(express.json());
app.use('/users',UserRoute);


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('error connecting to DataBase',err);
});


app.listen(PORT, () => {
    console.log('Server is running on port 5000');
});