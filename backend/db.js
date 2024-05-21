const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://punianichirag:komal%40123@cluster0.p7lu5rd.mongodb.net/goFood?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        const food_catagories = await mongoose.connection.db.collection("food_catagories").find({}).toArray();
        global.food_items = data;
        global.food_catagories = food_catagories;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;
