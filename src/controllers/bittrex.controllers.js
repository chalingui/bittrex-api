const axios = require('axios')
const e = require('express')
const { httpError } = require('../helpers/handleErrors.js')

// ORDERBOOK Controller
// Returns bids and asks from Bittrex API
const orderbook = async (req, res) => {

    try {

        const response = await axios.get(`${process.env.API_URL}/${req.query.pair}/orderbook`)
    
        res.json({
            
            status: 'ok',
            pair: req.query.pair,
            results: response.data
        
        })


    } catch (err) {

        httpError(res, 'Error connecting to orderbook provider.')

    }

}

// QUOTE Controller
// Estimate buy and sell prices using the orderbook from Bittrex API
const quote = async (req, res) => {

    var rate = 0
    var orders = []

    try {

        // Get pair orderbook
        const response = await axios.get(`${process.env.API_URL}/${req.query.pair}/orderbook`)
        
        if(!response.data) {

            httpError(res, 'Could not read orderbook.')

        }

        // Load orders object with bids for sell and asks for buy for further processing
        if (req.query.type == 'SELL') {

            if(!response.data.bid) {

                httpError(res, 'Could not read orderbook.')
            }

            orders = response.data.bid

        } else if (req.query.type == 'BUY') {

            if(!response.data.ask) {

                httpError(res, 'Could not read orderbook.')
            }

            orders = response.data.ask

        }
    
    
    } catch (err) {

        httpError(res, 'Error connecting to orderbook provider.')
        return
    }


    if (orders.length == 0) {

        httpError(res, 'Could not read orderbook.')
        return

    }


    var i = 0
    var quantity = 0        
    
    while(1) {

        // Reaching the end of the orderbook without filling the amount needed.
        if(i+1 >= orders.length) {

            httpError(res, 'Insufficient liquidity.')

        }

        // Checking if quote is complete with first available offer.
        if(req.query.amount < quantity + parseFloat(orders[i].quantity)) {

            rate = parseFloat(orders[i].rate) * parseFloat(req.query.amount)
            break

        }
        
        quantity += parseFloat(orders[i].quantity)
        rate += parseFloat(orders[i].rate) * parseFloat(orders[i].quantity)

        // Checking if quote is complete with the next available offer.
        if(req.query.amount < quantity + parseFloat(orders[i+1].quantity)) {

            rate += parseFloat(orders[i+1].rate) * parseFloat(req.query.amount - quantity)
            break

        }

        i++

    }

    res.json({
    
        status: 'ok',
        pair: req.query.pair,
        type: req.query.type,
        amount: req.query.amount,
        rate,
    
    })




}

module.exports = { orderbook, quote }