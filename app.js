const { error } = require('console');
const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');

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
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({message: "User Created"})

    } catch (error){
        res.status(409).json({message: error.message})
    }
})




// User Login 
app.post('/login', (req, res) =>{
    try{
        const {email, password} = req.body;
        const user = User.findOne({email: email});
        if(user && user.password === password){
            res.status(200).json({message: "Login Success"})
        } else {
            res.status(401).json({message: "Invalid Credentials"})
        }

    } catch (error){
        res.status(500).json({message: error.message})
    }
})


// console.log(req.body)

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
