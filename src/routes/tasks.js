const {Router} = require('express')
const router = Router()
const {create, tasks, task_id, edit, trash}  = require('../controllers/TasksControllers')
const passport = require('passport')

//Routes
//create
router.post('/create', passport.authenticate('jwt',{session:false}),create )

//get_all
router.get('/tasks', passport.authenticate('jwt',{session:false}), tasks )

//get_id
router.get('/task/:id',passport.authenticate('jwt',{session:false}), task_id )

//edit
router.put('/edit/:id',passport.authenticate('jwt',{session:false}), edit )

//delete
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}), trash )

module.exports=router