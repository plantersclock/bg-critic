const BGGBase = require('../models/bggbase-model')

createBGGBase = (req, res) => {
    const body = req.body
    let bggBase

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a BGG Base Item',
        })
    }

    req.body.map(item => {
     bggBase = new BGGBase(item)

    if (!bggBase) {
        return res.status(400).json({ success: false, error: err })
    }

    bggBase
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: bggBase._id,
                message: 'BGG Base Item created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'BGG Base Item not created!',
            })
        })
    })
}

updateBGGBase = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    BGGBase.findOne({ _id: req.params.id }, (err, bggBase) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'BGG Base Item not found!',
            })
        }
        bggBase.author = body.author
        bggBase.game = body.game
        bggBase.channel = body.channel
        bggBase.channel_link = body.channel_link
        bggBase.source = body.source
        bggBase.year = body.year
        bggBase.bgg_id = body.bgg_id
        bggBase.rating = body.rating
        bggBase
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: bggBase._id,
                    message: 'BGG Base Item updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'BGG Base Item not updated!',
                })
            })
    })
}

deleteBGGBase = async (req, res) => {
    await BGGBase.findOneAndDelete({ _id: req.params.id }, (err, bggBase) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!bggBase) {
            return res
                .status(404)
                .json({ success: false, error: `BGG Base Item not found` })
        }

        return res.status(200).json({ success: true, data: bggBase })
    }).catch(err => console.log(err))
}

getBGGBaseById = async (req, res) => {
    await BGGBase.findOne({ gameId: req.params.id }, (err, bggBase) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!bggBase) {
            return res
                .status(404)
                .json({ success: false, error: `BGG Base Item not found` })
        }
        return res.status(200).json({ success: true, data: bggBase })
    }).catch(err => console.log(err))
}

getBGGBases = async (req, res) => {
    await BGGBase.find({}, (err, bggBases) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bggBases.length) {
            return res
                .status(404)
                .json({ success: false, error: `BGG Base Items not found` })
        }
        return res.status(200).json({ success: true, data: bggBases })
    }).catch(err => console.log(err))
}

module.exports = {
    createBGGBase,
    updateBGGBase,
    deleteBGGBase,
    getBGGBases,
    getBGGBaseById,
}