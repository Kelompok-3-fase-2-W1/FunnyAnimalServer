const { User } = require('../models/index.js');
const { comparePassword } = require('../helpers/hashPassword');
<<<<<<< HEAD
const axios = require('axios')
=======
const { jwtSign } = require('../helpers/jwt.js')
>>>>>>> 76382cbbf0275489dfa36b4cde610a9e9bc621a6

class Controller {
    static async userRegister(req, res, next) {

        // console.log(req.body)

        try {
            const newUser = await User.create(req.body)
            res.status(201).json(newUser)
        } catch (err) {
            // console.log(err)

            res.status(500).json(err.message)
        }

    }
<<<<<<< HEAD
    static async userLogin(req, res, next) {

        // console.log(req.body);

=======


    static async userLogin(req, res, next) {

        console.log(req.body);

>>>>>>> 76382cbbf0275489dfa36b4cde610a9e9bc621a6
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            // console.log(user.dataValues, req.body.password, user.password)
            // console.log(comparePassword(req.body.password, user.password))

            if (!user) {
<<<<<<< HEAD
=======
                // console.log(object);
>>>>>>> 76382cbbf0275489dfa36b4cde610a9e9bc621a6
                res.status(500).json({ message: `Invalid user` })
            } else if (!comparePassword(req.body.password, user.password)) {
                res.status(500).json({ message: `Invalid user/password` })
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
<<<<<<< HEAD
            // console.log(err)
=======
            console.log(err)
>>>>>>> 76382cbbf0275489dfa36b4cde610a9e9bc621a6

            res.status(500).json(err.message)
        }


        res.status(200).json(req.body)
    }
<<<<<<< HEAD
    static async cat(req, res, next) {

        try {
            let cat = await axios({
                method: `GET`,
                url: `https://api.thecatapi.com/v1/images/search?api_key=c9fb96c2-58df-4c88-8558-a369c7911aaa`,
            })

            // console.log(cat.data)

            res.status(200).json(cat.data)
        } catch (err) {
            res.status(500).json(err.message)
        }

    }
    static async dog(req, res, next) {
=======

    static async cat(req, res, next) {

        try {
            let cat = await axios({
                method: `GET`,
                url: `https://api.thecatapi.com/v1/images/search?api_key=c9fb96c2-58df-4c88-8558-a369c7911aaa`,
            })

            // console.log(cat.data)

            res.status(200).json(cat.data)
        } catch (err) {
            res.status(500).json(err.message)
        }
>>>>>>> 76382cbbf0275489dfa36b4cde610a9e9bc621a6

        // console.log('tes')

        try {
            let dog = await axios({
                method: `GET`,
                url: `https://random.dog/woof.json`
            })

            // console.log(dog.data)

            res.status(200).json(dog.data)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
<<<<<<< HEAD

    static async fox(req, res, next) {
        try {
            let fox = await axios({
                method: `GET`,
                url: `https://randomfox.ca/floof/`
            })

            // console.log(fox)

            res.status(200).json(fox.data)
        } catch(err) {
=======
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
>>>>>>> 76382cbbf0275489dfa36b4cde610a9e9bc621a6
            res.status(500).json(err.message)
        }
    }

    static async fox(req, res, next) {
        try {
            let fox = await axios({
                method: `GET`,
                url: `https://randomfox.ca/floof/`
            })

            // console.log(fox)
        }}
}

module.exports = Controller





