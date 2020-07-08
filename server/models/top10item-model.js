const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top10Item = new Schema(
    {
        author: { type: String, required: true },
        game: { type: String, required: true },
        channel: { type: String, required: false },
        channel_link: { type: String, required: false },
        source: { type: String, required: false },
        year: { type: Number, required: false },
        rating: { type: Number, required: false},
        bgg_id: { type: Number, required: false},
    },
    { timestamps: true },
)

module.exports = mongoose.model('top10item', Top10Item)