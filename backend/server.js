const express = require('express');
require("dotenv").config();
const cors = require('cors');

const connectDB = require('./config/db');
const app = express();

connectDB();  //database connection
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Backend running...")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`App listening on PORT:${PORT}`)
})