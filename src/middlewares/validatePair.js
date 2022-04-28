const { httpError } = require('../helpers/handleErrors.js')

// Check if the pair requested is allowed in configuration file
const validatePair = (req, res, next) => {

    if (process.env.ALLOWED_PAIRS.split(' ').indexOf(req.query.pair) != -1) {
        
        return next()

    } else {
        
        httpError(res, 'Pair not supported.')

    }

}

module.exports = validatePair