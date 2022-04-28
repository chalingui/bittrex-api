const httpError = (res, err) => {

    res.status(500).json({

        status: 'error',
        msg: err

    })

}

module.exports = { httpError }