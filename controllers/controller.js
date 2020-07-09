const { User } = require('../models/index.js');
const { comparePassword } = require('../helpers/hashPassword');

class Controller {
    static async userRegister(req, res, next){
        
        // console.log(req.body)

        try{
            const newUser = await User.create(req.body)
            res.status(201).json(newUser)
        } catch (err) {
            // console.log(err)

            res.status(500).json(err.message)
        }
        
    }
    static async userLogin(req, res, next){
        
        console.log(req.body);

        try{
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            })

            // console.log(comparePassword(req.body.password, user.password))
            
            if(!user) {
                res.status(500).json({message: `Invalid user`})
            } else if(!comparePassword(req.body.password, user.password)) {
                res.status(500).json({message: `Invalid user/password`})
            } else {
                res.status(200).json(user)

                //Json Webtoken
            }

        } catch(err) {
            console.log(err)

            res.status(500).json(err.message)
        }


        res.status(200).json(req.body)
    }
    static cat(req, res, next){

    }
    static dog(req, res, next){

    }
    static fox(req, res, next){
        
    }
}

module.exports = Controller