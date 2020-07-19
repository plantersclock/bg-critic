const Top10Item = require('../models/top10item-model')
const BGGBase = require('../models/bggbase-model')
const _ = require('lodash')

createTop10Item = (req, res) => {
    const body = req.body
    let top10Item

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 10 Item',
        })
    }

    req.body.map(item => {
     top10Item = new Top10Item(item)

    if (!top10Item) {
        return res.status(400).json({ success: false, error: err })
    }

    top10Item
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: top10Item._id,
                message: 'Top 10 Item created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Top 10 Item not created!',
            })
        })
    })
}

updateTop10Item = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Top10Item.findOne({ _id: req.params.id }, (err, top10Item) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 10 Item not found!',
            })
        }
        top10Item.author = body.author
        top10Item.game = body.game
        top10Item.channel = body.channel
        top10Item.channel_link = body.channel_link
        top10Item.source = body.source
        top10Item.year = body.year
        top10Item.bgg_id = body.bgg_id
        top10Item.rating = body.rating
        top10Item
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: top10Item._id,
                    message: 'Top 10 Item updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Top 10 Item not updated!',
                })
            })
    })
}

deleteTop10Item = async (req, res) => {
    await Top10Item.findOneAndDelete({ _id: req.params.id }, (err, top10Item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!top10Item) {
            return res
                .status(404)
                .json({ success: false, error: `Top 10 Item not found` })
        }

        return res.status(200).json({ success: true, data: top10Item })
    }).catch(err => console.log(err))
}

getTop10ItemById = async (req, res) => {
    await Top10Item.findOne({ _id: req.params.id }, (err, top10Item) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!top10Item) {
            return res
                .status(404)
                .json({ success: false, error: `Top 10 Item not found` })
        }
        return res.status(200).json({ success: true, data: top10Item })
    }).catch(err => console.log(err))
}

getTop10ItemsByYear = async (req, res) => {

    console.log(req)
    let top10Items = await Top10Item.find({ year: req.params.id }, (err, top10Items) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!top10Items) {
            return res
                .status(404)
                .json({ success: false, error: `Top 10 Item not found` })
        }
        // return res.status(200).json({ success: true, data: top10Items })
        return top10Items
    }).catch(err => console.log(err))

    
    bggBases= await BGGBase.find({}, (err, bggBases) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bggBases.length) {
            return res
                .status(404)
                .json({ success: false, error: `BGG Base Items not found` })
        }
    }).catch(err => console.log(err))

    top10Items = top10Items.map(top10Item => {
        let bggItem = bggBases.filter(bggItem => bggItem.gameId === top10Item.bgg_id)[0]
        return _.merge(top10Item, bggItem)

    })



    return res.status(200).json({ success: true, data: top10Items})
}

getTop10Items = async (req, res) => {
    await Top10Item.find({}, (err, top10Items) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top10Items.length) {
            return res
                .status(404)
                .json({ success: false, error: `Top 10 Items not found` })
        }
        return res.status(200).json({ success: true, data: top10Items })
    }).catch(err => console.log(err))
}

module.exports = {
    createTop10Item,
    updateTop10Item,
    deleteTop10Item,
    getTop10Items,
    getTop10ItemById,
    getTop10ItemsByYear,
}