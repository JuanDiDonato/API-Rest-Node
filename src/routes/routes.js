const {Router} = require('express')
const router = Router()
const {create, tasks, task_id, edit, trash}  = require('../controllers/controllers')

//Routes
//create
router.post('/create', create )

//get_all
router.get('/tasks', tasks )

//get_id
router.get('/task/:id', task_id )

//edit
router.put('/edit/:id', edit )

//delete
router.delete('/delete/:id', trash )

module.exports=router