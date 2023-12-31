const jwt = require('jsonwebtoken');
module.exports = (req, res, next) =>{
    const authHeader = req.get('token');
    if(!authHeader){
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1];
    if(!token || token == ''){
        req.isAuth = false
        return next();
    }
    let decodedToken;
    try{
        console.log(token)
        decodedToken = jwt.verify(token, 'somesupersecretkey')
    }catch(err){
        req.isAuth =false;
        console.log(err.message)
        return next();
    }

    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}