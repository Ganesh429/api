var jwt = require('jsonwebtoken')
let envdata = require('../config/env')

function authToken(req, res, next) {
    try {

        var user = "";
        let token = req.headers['x_access_token'];
        if (token != undefined && token != null && token != '') {

            jwt.verify(token, envdata.SECRET, (error, user) => {
                if (error) {
                    res.send({ 'status': false, message: 'invalid authorization token' })
                }
                console.log("user==", user)
                if (user != undefined && user != null && user != '') {
                    req.body.userId = user.userid;
                    next();
                }
            })
        } else {
            res.send({ 'status': false, message: 'enter valid token' })
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = authToken;