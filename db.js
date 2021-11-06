const mongoose = require("mongoose")

const connectDb = () => {
    mongoose.connect("mongodb://localhost/openDb", {

    })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error: '))
    db.once('open', async () => {
        console.log(`Database connected on ${db.host}:${db.name}`)

    })
}
module.exports = connectDb