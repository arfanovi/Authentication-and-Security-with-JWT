const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config()

// app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json())


app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/index.html")
    // res.send('Hello Auth')
})


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
