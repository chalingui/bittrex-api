const express = require('express')
const router = express.Router()
const bittrex = require('../controllers/bittrex.controllers')
const validateAmount = require('../middlewares/validateAmount')
const validatePair = require('../middlewares/validatePair')
const validateType = require('../middlewares/validateType')

router.get('/orderbook', validatePair, bittrex.orderbook)

router.get('/quote', validatePair, validateType, validateAmount, bittrex.quote)

// Default route for the rest of the paths
router.get('*', (req, res) => {

    res.status(404).json({
            
        status: 'error',
        msg: 'Not found.'
    
    })

})

module.exports = router