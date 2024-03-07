
const mongoose = require("mongoose");


const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log(`Mongo db connected`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB