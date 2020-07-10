const errorHandler = (err, req, res, next) => {
    if (err.name == 'Unauthorized') {
        return res.status(401).json({
            errors: err.errors
        })
    } else if (err.name == 'NotFound') {
        return res.status(404).json({
            errors: err.errors
        })
    } else if (err.name == `BadRequest`) {
        return res.status(400).json({
            errors: err.errors
        })
    } else if (err.name == `SequelizeUniqueConstraintError`) {
        return res.status(400).json({

            errors: `email already used`

        })
    } else if (err.name == 'SequelizeValidationError') {
        // err = err.errors.map(error => error.message)

        res.status(400).json({
            errors: err.errors
        });
    } else {
        // console.log(err.message)
        return res.status(500).json({
            errors: err.errors
        })
    }
}

module.exports = errorHandler;