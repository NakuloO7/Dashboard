const express = require('express');
require("dotenv").config();
const cors = require('cors');

const connectDB = require('./config/db');
const app = express();

connectDB();  //database connection
app.use(cors());
app.use(express.json());

const insightRoute = require('./routes/insights');

app.use('/api/insights', insightRoute);

app.get('/', (req,res)=>{
    res.send("Backend running...")
})

const PORT = process.env.PORT || 3
console.log(PORT)

app.listen(PORT, ()=>{
    console.log(`App listening on PORT:${PORT}`)
})