const jwt = require('jsonwebtoken');

//Middleware function to protect content from logged-out users
module.exports = function (req, res, next){
const token = req.header('auth-token');
if(!token) return res.status(401).send('Access Denied');

//Verify the token
try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified;
    next();
}catch{
    res.status(400).send('Invalid Token');
};
}
