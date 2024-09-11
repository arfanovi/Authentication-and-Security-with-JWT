// Database Encryption 


// hashing password 

const { error } = require('console');
const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');

// import md5 from 'md5';
// const md5 = require('md5');

// Import Bcrypt 
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const PORT = process.env.PORT || 5000;
// const db = process.env.mongo_url;
const User = require('./model/user')

const db = 'mongodb://localhost:27017'
// const db = 'mongodb+srv://arfan:arfan201@cluster0.p0yid.mongodb.net/'
require('dotenv').config()

// const url = mongodb://localhost:27017/


// mongoDB Connection 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB Atlas is Connected');
})
.catch((error) => {
    console.error('MongoDB not connected:', error.message);
    process.exit(1);
});


// app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json())


app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/index.html")
    // res.send('Hello Auth')
})


// User Registration
app.post("/register", async(req, res) =>{
    try {
        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
            const newUser = new User({
                email: req.body.email,
                password: hash,
                // password: md5(req.body.password)
            });
            await newUser.save();
            res.status(201).json({message: "User Created"})
        });
    } catch (error){
        res.status(500).json({message: error.message})
    }
})




// User Login 
app.post('/login', async (req, res) =>{
    try{
       const email = req.body.email;
       const password = req.body.password;
    //    const password = md5(req.body.password);
        const user = await User.findOne({email: email});

        if(user){
            // Load hash from your password DB.
            bcrypt.compare(password, user.password, function(err, result) {
                // result == true
                if(result === true){
                    // Passwords match
                    res.status(200).json({message: "Login Success"})                
                } else {
                    // Passwords don't match
                    console.log('Password not match')
                }
            });
        } else {
            res.status(401).json({message: "Invalid Credentials"})
        }
    } catch (error){
        res.status(500).json({message: error.message})
    }
})


// console.log(req.body)

// Route Handle 
app.use((req, res, next) =>{
    res.status(404).json({
        message: "Route Not Found"
    })
})



// Server Handle 
app.use((err, req, res, next)=>{
    res.status(500).json({
        message: "Something broke"
    })
})

app.listen(PORT , () =>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
