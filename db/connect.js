const mongoose = require("mongoose");

const connectDB = (url) => {
  try {
    mongoose.connect(url);
    console.log(`Mongo db connected`);
  } catch (error) {
    console.log('FROM CONNECT.JS >>>',error);
    process.exit(1);
  }
};

module.exports = connectDB;
