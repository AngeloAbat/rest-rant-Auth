const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

  
router.post('/', async (req, res) => {

    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        console.log("It worksnot")
        res.status(404).json({
            message: "Could not find a user with the provided context"
        })
    } else{
        req.session.userId = user.userId
        res.json({user})
        console.log("Here is the ID : "+ user.userId)

    }
})
  

router.get('/profile', async (req,res) => {
    try{
        let user = await User.findOne({
            where: {
                userId: req.session.userId
            }
        })

        res.json(user)
        console.log("/profile worked and activated, here's the UserID: " + req.session.userId)
    } catch{
        console.log("/profile ID is not found: " + req.session.userId)
        res.json(null)
    }
})




module.exports = router