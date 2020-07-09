const { User } = require('../models/index.js');
const { comparePassword } = require('../helpers/hashPassword');
const { jwtSign } = require('../helpers/jwt.js')

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

        console.log(req.body);

        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            // console.log(comparePassword(req.body.password, user.password))

            if (!user) {
                // console.log(object);
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
            console.log(err)

            res.status(500).json(err.message)
        }


        res.status(200).json(req.body)
    }

    static cat(req, res, next) {
        // console.log('ok');
        // res.status(200).json({
        //     message: 'authenticated'
        // });

    }
    static dog(req, res, next) {

    }
    static fox(req, res, next) {

    }
}

module.exports = Controller