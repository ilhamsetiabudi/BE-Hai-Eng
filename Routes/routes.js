const UserBisniLogic = require('../BisnisLogic/M_User_BL') 
const AuthToken = require('../token/authtoken')

module.exports = exports = function(server){
    server.get('/api/token', AuthToken.checkToken)
    server.get('/api/user', UserBisniLogic.readUserAllHandler)
    server.post('/api/user', UserBisniLogic.createUserAllHandler)
    server.put('/api/user', UserBisniLogic.updateUserAllHandler)
    server.post('/api/login', UserBisniLogic.login)
    server.post('/api/register', UserBisniLogic.register)
   
    
}