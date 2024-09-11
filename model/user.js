const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
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


// const enKey = process.env.ENC_KEY;
const enKey = process.env.ENC_KEY || "default_encryption_key"; // fallback if ENC_KEY is missing



// exclude age from encryption, still encrypt name. _id will also remain unencrypted
userSchema.plugin(encrypt, { secret: enKey, encryptedFields: ['password'] });


module.exports = mongoose.model('user', userSchema)




