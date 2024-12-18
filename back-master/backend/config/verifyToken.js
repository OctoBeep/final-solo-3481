const jwt = require('jsonwebtoken')
const config = require('./global')

function verifyToken(req, res , next){
    const token = req.headers['x-acess-token']

    if(!token){
        return res.status(404).json({
            auth: false,
            message: 'No hay Token'
        })
    }
    
    const decoded = jwt.verify(token, config.secret)
    req.userId = decoded.userId
    next()
}

module.exports = verifyToken