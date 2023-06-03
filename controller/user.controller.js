let UserModel = require('../models/user.model')
var jwt = require('jsonwebtoken')
let envdata = require('../config/env')
let bcryprt = require('bcrypt');
RoundSalt = 10
module.exports = {
    register,
    login,
    update,
    userdelete,
    getAllusers,
    getAlluserswithskipandlimit
}

function register(req, res) {
    let reqobj = req.body;
    let hash = bcryprt.hashSync(reqobj.password, RoundSalt)
    let obj = {
        userName: reqobj.userName,
        email: reqobj.email,
        password: hash,
        phone: reqobj.phone
    }
    UserModel.create(obj, function(error, data) {
        if (error) {
            console.log(error)
        } else {
            res.send({ data: data })
        }
    })
}

/*function login(req, res) {
    let reqs = req.body;
    let email = reqs.email;
    let password = reqs.password;
    UserModel.findOne({ $and: [{ email: email }, { password: password }] }, function(error, data) {
        if (error) {
            console.log(error)
        } else {
            res.send({ data: data })
        }
    })
}*/

function update(req, res) {
    try {

        var reqobj = req.body;
        var userId = reqobj._id;
        let userName = reqobj.userName
        let email = reqobj.email
        let password = reqobj.password
        let phone = reqobj.phone
        UserModel.updateOne({ _id: userId }, {
            $set: {
                userName: userName,
                email: email,
                password: password,
                phone: phone
            }
        }, function(error, data) {
            if (error) {
                console.log(error)
            } else {
                res.send({ data: data })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

function userdelete(req, res) {
    let reqs = req.body;
    let userid = reqs._id;
    UserModel.remove({ _id: userid }, function(error, data) {
        if (error) {
            console.log(error)
        } else {
            res.send({ data: data })
        }
    })
}

function getAllusers(req, res) {
    UserModel.find({}, function(error, data) {
        if (error) {
            console.log(error)
        } else {
            res.send({ data: data })
        }
    })
}

function getAlluserswithskipandlimit(req, res) {
    let reqs = req.body;
    let skip = reqs.skip;
    let limit = reqs.limit;
    UserModel.find({}).skip(skip).limit(limit).exec(function(error, data) {
        if (error) {
            console.log(error)
        } else {
            res.send({ data: data })
        }
    })
}

/*function login(req, res) {
    let reqs = req.body;
    let email = reqs.email;
    let password = reqs.password;
    UserModel.findOne({ $and: [{ email: email }, { password: password }] }, function(error, data) {
        if (error) {
            console.log(error)
        } else {
            if (data != null) {
                let user = data
                let userid = user._id;
                var token = jwt.sign({ userid }, envdata.SECRET, { expiresIn: 8600 });

                res.cookie('x_access_token', token)
                res.send({ data: data, x_access_token: token })
            } else {
                res.send({ status: false, message: "not found" })
            }
        }
    })
}*/
/*async function login(req, res) {

    let reqs = req.body;
    let email = reqs.email;
    let password = reqs.password;
    let data = await UserModel.findOne({ $and: [{ email: email }] })
    if (data == null) {
        res.send({ status: false, message: "Invalid Email" })
    } else {
        let valid = bcryprt.compareSync(password, data.password);
        if (valid == true) {
            res.send({ status: true, message: "success", data: data })
        } else {
            res.send({ status: false, message: "Invalid Email/Password" })
        }
    }
}*/
function login(req, res) {
    let reqs = req.body;
    let email = reqs.email;
    let password = reqs.password;
    UserModel.findOne({ $and: [{ email: email }] }, function(error, data) {
        if (error) {
            console.log(error)
        } else {
            if (data != null) {
                let valid = bcryprt.compareSync(password, data.password);
                if (valid == true) {
                    let user = data
                    let userid = user._id;
                    var token = jwt.sign({ userid }, envdata.SECRET, { expiresIn: 87000 });
                    res.cookie('x_access_token', token)
                    res.send({ status: true, message: "success", data: data, x_access_token: token })
                } else {
                    res.send({ status: false, message: "Invalid Email/Password" })
                }
            } else {
                res.send({ status: false, message: "not found" })
            }
        }
    })
}