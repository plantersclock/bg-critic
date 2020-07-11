const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BGGBase = new Schema(
    {
        gameId: { type: Number, required: true, unique: true },
        playingTime: { type: Number, required: false},
        yearPublished: { type: Number, required: false},
        minPlayers: { type: Number, required: false},
        maxPlayers: { type: Number, required: false},
        name: { type: String, required: true },
        artists: { type: Array, required: false },
        description: { type: String, required: true },
        designers: { type: Array, required: false },
        expansions: { type: Array, required: false },
        publishers: { type: Array, required: false },
        image: { type: String, required: true },
        thumbnail: { type: String, required: true },
        mechanics: { type: Array, required: false },
        isExpansion: { type: Boolean, required: false },        
    },
    { timestamps: true },
)

module.exports = mongoose.model('bggBase', BGGBase)