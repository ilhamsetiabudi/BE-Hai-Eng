const jwt = require('jsonwebtoken')
const authconfig = require('../Config/auth.config.json')
const ResponseHelper = require('../Helpers/responseHelper')
module.exports = {
    checkToken: (req, res, next) => {
        console.log(req.header)
        if(!req.headers.authorization){
            ResponseHelper.sendResponse(res, 403, 'You Are Not Authorized')
        } else {
            let token = req.headers.authorization
            jwt.verify(token, authconfig.secretkey, (err, decoded) => {
                if(decoded == undefined){
                    ResponseHelper.sendResponse(res, 403, 'You Are Not Authorized')
                } else {
                    req.userdata = decoded
                    next()
                }
            })
        }
    }
}