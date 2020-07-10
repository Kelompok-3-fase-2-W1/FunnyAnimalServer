'use strict'
const { User } = require('../models/index.js');
const { comparePassword } = require('../helpers/hashPassword');
const { jwtSign } = require('../helpers/jwt.js')
const axios = require('axios')
const { verify } = require('../helpers/googleOauth.js')

class Controller {
    static async userRegister(req, res, next) {

        // console.log(req.body)

        try {
            const newUser = await User.create(req.body)
            res.status(201).json(newUser)
        } catch (err) {

            // console.log(err);

            if (err.name == `SequelizeValidationError`) {

                err = err.errors.map(error => error.message).join(', ')

                // console.log(err)

                next({
                    name: `SequelizeValidationError`,
                    errors: err
                })
            } else if (err.name == `SequelizeUniqueConstraintError`) {

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

    static async googleLogin(req, res) {
        const google_token = req.headers.google_token

        try {
            const payload = await verify(google_token)
            const email = payload.email

            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (user) {

                if (!comparePassword(process.env.GOOGLE_DEFAULT_BROWSER, user.password)) {
                    throw 'please login via website'
                } else {
                    const payload = {
                        email: user.email
                    }
                    const token = jwtSign(payload)

                    res.status(200).json({
                        token
                    })
                }

            } else {
                let user = User.create({
                    email: email,
                    password: process.env.GOOGLE_DEFAULT_BROWSER
                })

                const payload = {
                    email: user.email
                }
                const token = jwtSign(payload)
                res.status(200).json({
                    token: token
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async cat(req, res, next) {

        console.log('tes')

        try {
            let cat = await axios({
                method: `GET`,
                url: `https://api.thecatapi.com/v1/images/search?api_key=${process.env.thecatapi_key}`,
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





