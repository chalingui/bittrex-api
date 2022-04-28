const { httpError } = require('../helpers/handleErrors.js')

// Check if the amount parameter is a number.
const validateAmount = (req, res, next) => {

    if (!isNaN(req.query.amount)) {
        
        return next()

    } else {
        
        httpError(res, 'Invalid amount.')

    }

}

module.exports = validateAmount