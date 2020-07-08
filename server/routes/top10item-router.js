
const express = require('express')

const Top10ItemCtrl = require('../controllers/top10item-ctrl')

const router = express.Router()

router.post('/top10', Top10ItemCtrl.createTop10Item)
router.put('/top10/:id', Top10ItemCtrl.updateTop10Item)
router.delete('/top10/:id', Top10ItemCtrl.deleteTop10Item)
router.get('/top10/:id', Top10ItemCtrl.getTop10ItemById)
router.get('/top10items', Top10ItemCtrl.getTop10Items)

module.exports = router