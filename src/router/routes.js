const express =  require('express')
const Router =  express.Router()
const authorized = require('../helpers/middleware')
const accountController = require('../controllers/userAct')

// const accountController1 = require('../controllers/product')

Router.post('/Signup', accountController.userSignup)

Router.post('/Login', accountController.login)

Router.post('/Logout', authorized.verifyToken, accountController.userLogout)

Router.post('/ChangePassword', authorized.verifyToken ,accountController.changePswd)

Router.get('/UpdateProfile', authorized.verifyToken ,accountController.updateProfile)

Router.get('/UserLists', authorized.verifyToken ,accountController.listUser)

module.exports = Router