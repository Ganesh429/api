let express = require('express')
let router = express.Router()

const authToken = require('../common/authToken');

let usercontroller = require('../controller/user.controller')
router.post('/register', usercontroller.register)
router.post('/login', usercontroller.login)
router.post('/update', authToken, usercontroller.update)
router.post('/userdelete', authToken, usercontroller.userdelete)
router.get('/getAllusers', authToken, usercontroller.getAllusers)
router.get('/getAlluserswithskipandlimit', usercontroller.getAlluserswithskipandlimit)

module.exports = router