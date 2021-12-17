const userModel = require('../models/userModel')
const jwtToken =  require('../settings/jwt')

const verifyToken = async (req, res, next) => {
    try {
            const token = req.headers['authorization']

            if(!token){
                throw Error('Token not found');
            }

            let userData = await userModel.findOne({ token: token })
            if(!userData){
                throw Error('Not Authorized');
            }

            let userToken = await  jwtToken.decodeToken(token)
            console.log("User Token ", userToken)

            if (userToken == "TokenExpiredError: jwt expired") {
                throw Error('JWT Token Expired')
            }
                req.user = userData;
                next()
        } catch (error) {
            res.status(401).send({error: error.message})
        }
}

module.exports = {verifyToken}