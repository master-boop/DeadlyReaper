const mongoose = require("mongoose")
require("dotenv").config()

const mongoDBURL = process.env.MONGODBURL

module.exports = () => {

    if (!mongoDBURL) return

    mongoose.connect(mongoDBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(console.log("Connected to MongoDB Database!"))
}