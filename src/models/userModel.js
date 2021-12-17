const mongoose =  require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({

    userName:{
        type: String,
        
    },
    email:{
        type: String,
        
    },
    password:{
        type: String,

    },
    address:{
        city:{
            type: String
        },state:{
            type: String
        },pincode:{
            type: String
        },streetAddress:{
            type: String
        }
    },
    dob:{
        type: Date
    },
    gender:{
         type: String,
         emum: ['male', 'female']
    },token:{ 
        type: String
    }

}, {
    timestamps: true

})
// function for the login user

userSchema.statics.findByCredentials = async (email, password) => {
     const user1 = await user.findOne({ email })

     if(!user1){
               throw Error('Email Id is not correct ')
     }
     const isMatch = await bcrypt.compare(password, user1.password)
     if(!isMatch){

        throw Error('Password not correct 1')
     }
      return user1
}


// generating the hash password
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const user = mongoose.model('user', userSchema)

module.exports =  user