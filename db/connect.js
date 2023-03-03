const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url)
}

module.exports = connectDB;

// const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/store-api'