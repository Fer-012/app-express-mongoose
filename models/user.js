const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
   
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) { // isModified is a method provided by mongoose which checks if the password is modified or not 
        user.password = await bcryptjs.hash(user.password, 8);//this : refers to the user object
    }// 8 is the number of rounds of hashing to be done on the password 
    next();//next is a callback function which is called after the password is hashed
});

userSchema.methods.comparePassword = async function (password) {
    const user = this;
    return bcryptjs.compare(password, user.password);
};
module.exports = mongoose.model('User', userSchema);
//hash is a one way function which converts the password into a random string of characters 
//methode compare  