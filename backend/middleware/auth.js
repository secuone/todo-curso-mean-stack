const { request } = require('express')
const jwt = require('jsonwebtoken')

function auth(req, res, next){
    let jwtToken = req.header('Authorization')
    if(!jwtToken) return res,status(401).send('Acceso Denegado')

    // Si llega tengo que hacer el split para quedarme solo el token
    jwtToken = jwtToken.split(' ')[1]
    if(!jwtToken) return res,status(401).send('Acceso Denegado')

    try{
        const payload = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT_API_TASK)
        // Si es correcto, guardo los datos de payload en el request para que siga su curso a través de los demas middlewares
        req.user = payload
        next()
    }catch(err){
        res.status(401).send('Acceso Denegado. Token no válido.')
    }
}

module.exports = auth