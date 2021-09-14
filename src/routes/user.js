const {Router} = require('express')
const router = Router()
const {register, login }  = require('../controllers/UserControllers')
const passport = require('passport')
require('../passport')


router.post('/register', register)

router.post('/login',passport.authenticate('local',{session:false}) ,login)

module.exports=router