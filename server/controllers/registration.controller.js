const User = require('../model/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10

module.exports = {
    createUser (req,res){
        const { username, email, password } = req.body
        User.findOne({'email': email})
        .exec()
        .then(user=>{
            if(user){
                res.status(500).json({
                    message: `Email has already taken`
                })
            }else{
                let salt = bcrypt.genSaltSync(saltRounds);
                let hash = bcrypt.hashSync(password, salt);

                const newUser = new User({
                    username, email, password: hash
                })
        
                newUser.save()
                .then(userData=>{
                    const token = jwt.sign({_id:userData._id, email: userData.email},process.env.secret)  
                    console.log(userData.username)
                    res.status(200).json({
                        token:token,username: userData.username})
                })
            }
        })
    },

    loginuser(req,res){
        const {username, password} = req.body
        User.findOne({$or:[{username: username},{email: username}]})
        .exec()
        .then(user=>{
            if(user){
                const verify = bcrypt.compareSync(password, user.password);
                if(verify){
                    const token = jwt.sign({_id:user._id}, process.env.secret)
                    res.status(200).json({
                        token,username: user.username
                    })
                }
            }else{
                res.status(500).json({
                    message: `Username or email does not exist`
                })
            }
        })

    }
}