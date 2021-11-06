const mongoose = require('mongoose')

const SubredditSchema = new mongoose.Schema({
    name: String,
    photo: String,

})

module.exports = mongoose.model("Subreddit", SubredditSchema)