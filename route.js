const express = require('express');
const router = express.Router();
const loginController = require('./controller/login')
const userController = require('./controller/user')
const jobController = require('./controller/job')
const ethereumController = require('./controller/fetchingEtherium')
const { authentication, authorisation } = require("./middleware/middleware")


router.get('/loginAdmin',loginController.login)

// user QUESTION 1 API'S
router.post('/user',authentication, authorisation,userController.createUser)
router.get('/user',userController.getAllUser)
router.get('/user/:id',userController.getUserByID)
router.put('/user/:id',authentication, authorisation,userController.updateUser)
router.delete('/user/:id',authentication, authorisation, userController.deleteUser)

// JOB   QUESTION 2 API'S
router.post('/job',jobController.createJob)
router.get('/job',jobController.getAllJob)
router.delete('/job',jobController.executeJob)


// QUESTION 4. 3rd PARTY API FETCHING API
router.get('/fetchEtherium',ethereumController.fetchEtherium)


module.exports = router;