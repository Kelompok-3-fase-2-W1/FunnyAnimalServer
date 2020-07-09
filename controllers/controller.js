const { User } = require('../models/index.js');
const { comparePassword } = require('../helpers/hashPassword');
const { jwtSign } = require('../helpers/jwt.js')
const axios = require('axios')

class Controller {
    static async userRegister(req, res, next) {

        // console.log(req.body)

        try {
            const newUser = await User.create(req.body)
            res.status(201).json(newUser)
        } catch (err) {

            console.log(err);

            if (err.name = `SequelizeValidationError`) {



                next({
                    name: `SequelizeValidationError`,
                    errors: `Please fill email & password`
                })
            } else if (err.name = `SequelizeUniqueConstraintError`) {

                next({
                    name: `SequelizeUniqueConstraintError`,
                    errors: `email already used`
                })
            } else {
                next({
                    name: `Internal Server Error`,
                    errors: err.message
                })
            }


        }

    }


    static async userLogin(req, res, next) {

        // console.log(req.body);

        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            // console.log(comparePassword(req.body.password, user.password))

            if (!user) {
                next({
                    name: `BadRequest`,
                    errors: `Invalid user/password`
                })
            } else if (!comparePassword(req.body.password, user.password)) {
                next({
                    name: `BadRequest`,
                    errors: `Invalid user/password`
                })
            } else {

                const payload = {
                    email: user.email
                }
                const token = jwtSign(payload)
                res.status(200).json({
                    token: token
                })

                //Json Webtoken
            }

        } catch (err) {
            // console.log(err)

            next({
                name: `Internal Server Error`,
                errors: err.message
            })
        }



    }

    static async cat(req, res, next) {

        try {
            let cat = await axios({
                method: `GET`,
                url: `https://api.thecatapi.com/v1/images/search?api_key=c9fb96c2-58df-4c88-8558-a369c7911aaa`,
            })

            // console.log(cat.data)

            res.status(200).json(cat.data)
        } catch (err) {
            next({
                name: `Internal Server Error`,
                errors: err.message
            })
        }

    }
    static async dog(req, res, next) {

        // console.log('tes')

        try {
            let dog = await axios({
                method: `GET`,
                url: `https://random.dog/woof.json`
            })

            // console.log(dog.data)

            res.status(200).json(dog.data)
        } catch (err) {
            next({
                name: `Internal Server Error`,
                errors: err.message
            })
        }
    }

    static async fox(req, res, next) {
        try {
            let fox = await axios({
                method: `GET`,
                url: `https://randomfox.ca/floof/`
            })

            // console.log(fox)

            res.status(200).json(fox.data)
        } catch (err) {
            next({
                name: `Internal Server Error`,
                errors: err.message
            })
        }
    }
}

module.exports = Controller





