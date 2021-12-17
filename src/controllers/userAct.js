const joi = require('joi')
const {createAccount} = require('../validators/userValidator')
const userModel = require('../models/userModel')
const { createToken } = require('../settings/jwt')
const bcrypt = require('bcryptjs')

const userSignup = async(req, res) => {
    try {
        const userForm = await createAccount.validateAsync(req.body)
        console.log(userForm)
        
        const validateEmail = await userModel.findOne({ email: userForm.email})
        console.log('validate = : ',validateEmail)

        if (validateEmail) {
            throw Error('Account already exist with this email.')
        }
        else {
        const user = await new userModel(req.body).save()
        const token = await createToken(user)

        const UpdateUser = await userModel.findOneAndUpdate({ _id: user._id }, { token: token }, { new: true })
            res.status(200).send({ data: UpdateUser })
        }       
        

    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}


// User login controll

const login = async (req, res) => {
    try {
        const userLogin = await userModel.findByCredentials(req.body.email, req.body.password)
        console.log(" User Data", userLogin)
        const token = await createToken(userLogin)

        const UpdateUser = await userModel.findOneAndUpdate({ _id: userLogin._id}, { token: token}, { new: true})

        res.status(200).send(UpdateUser)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}
// controller for the user logout

const userLogout =  async (req, res) => {
    try {
        const id = req.user._id
        const token = await userModel.findById(id)
    
    const logout = await userModel.findByIdAndUpdate(id,{token: " "})
res.status(200).json({message: 'Logout Successfully !'})
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}


// controller to change the password of the user
const changePswd = async (req, res) => {
try {
     const id = req.user._id

     const oldPassword = req.body.oldPassword
     const newPassword = req.body.newPassword

     const user = await userModel.findById(id)
     const isMatch = await bcrypt.compare(oldPassword, user.password)

     if(!isMatch) {

        throw Error('Old password is Wrong !')
     } else {
         let bcryptPassword = await bcrypt.hash(newPassword, 8)
         const updatePassword = await userModel.findByIdAndUpdate(id, { password: bcryptPassword })
         return res.status(200).send({ message: 'Password Updated '})
     }
} catch (error) {
    res.status(400).json({message: error.message})
}
}


// controller for the update profile
const updateProfile = async (req, res) => {
    try {
        const id = req.user._id
        // console.log('The id is => ',id)
        const user = await userModel.findById(id)
        console.log(" the user is => ",user)

        if(user){
            const updateUser = await userModel.findByIdAndUpdate(user, req.body, { new: true, runValidators: true}).select('-token -password')
            return res.status(200).send(updateUser)
        }
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// controller to fetch the user
const listUser = async (req, res) => {
    try {
        const search = req.query.search

        const searchQuery = {};
        if(search){
            searchQuery = {userName: {$regex: search, $options: "i"}}
        }
        const UserLists = await userModel.find(searchQuery).select('-token -password').sort({ createdAt : 1})

        const list = await userModel.countDocuments({})

        let data = {
            users : list,
            userData: UserLists
        }
        res.status(200).send(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
module.exports = {

    userSignup,
    login,
    userLogout,
    changePswd,
    updateProfile,
    listUser

}