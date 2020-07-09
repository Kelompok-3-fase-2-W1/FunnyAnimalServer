const { User } = require('../models/index.js');
const { comparePassword } = require('../helpers/hashPassword');
const axios = require('axios')

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
    static async userLogin(req, res, next) {

        // console.log(req.body);

        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            // console.log(user.dataValues, req.body.password, user.password)
            // console.log(comparePassword(req.body.password, user.password))

            if (!user) {
                res.status(500).json({ message: `Invalid user` })
            } else if (!comparePassword(req.body.password, user.password)) {
                res.status(500).json({ message: `Invalid user/password` })
            } else {
                res.status(200).json(user)

                //Json Webtoken
            }

        } catch (err) {
            // console.log(err)

            res.status(500).json(err.message)
        }


        res.status(200).json(req.body)
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
            res.status(500).json(err.message)
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

            res.status(200).json(fox.data)
        } catch(err) {
            res.status(500).json(err.message)
        }
    }
}

module.exports = Controller