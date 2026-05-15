require('dotenv').config();

const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const Insight = require('../models/Insight');

const connectDB = async()=>{
    try {
    await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const importData = async()=>{
    try {
        connectDB();   //connecting to the database

        //delete the previous data
        await Insight.deleteMany();
        console.log("old data deleted");

        const filePath = path.join(__dirname, '../../jsondata.json');
        const jsondata = fs.readFileSync(filePath, 'utf-8');

        const parsedData = JSON.parse(jsondata);
        
        //insert this data into the DB
        await Insight.insertMany(parsedData);

        console.log("Data imported successfully!");

        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

importData();