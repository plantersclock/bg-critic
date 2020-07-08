
const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://bg_user_1:Boboman861@cluster0.x0fq3.mongodb.net/bg-top10?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db