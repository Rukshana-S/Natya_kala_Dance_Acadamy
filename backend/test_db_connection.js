
require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
    try {
        console.log("Testing connection with: " + process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@'));
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("SUCCESS: Database connected!");
        process.exit(0);
    } catch (e) {
        console.error("FAILURE: Connection failed", e.message);
        process.exit(1);
    }
};

connect();
