const { httpError } = require('../helpers/handleErrors.js')

// Check if the operation type requested is correct
const validateType = (req, res, next) => {

    if (req.query.type == 'SELL' || req.query.type == 'BUY') {
        
        return next()

    } else {
        
        httpError(res, 'Wrong operation type.')

    }

}

module.exports = validateType