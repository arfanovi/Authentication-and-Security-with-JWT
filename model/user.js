const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    createOn: {
        type: String,
        default: Date.now
    }
})





module.exports = mongoose.model('user', userSchema)




