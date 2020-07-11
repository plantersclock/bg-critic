
const express = require('express')

const BGGBaseCtrl = require('../controllers/bggbase-ctrl')

const router = express.Router()

router.post('/bgg', BGGBaseCtrl.createBGGBase)
router.put('/bgg/:id', BGGBaseCtrl.updateBGGBase)
router.delete('/bgg/:id', BGGBaseCtrl.deleteBGGBase)
router.get('/bgg/:id', BGGBaseCtrl.getBGGBaseById)
router.get('/bgg', BGGBaseCtrl.getBGGBases)

module.exports = router