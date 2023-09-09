const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const admin = require('../model/login')

//////////// AUTHENTICATION ///////////////////

let authentication = async function (req, res, next) {
    try {
        let token = req.headers["authorisation"]
        if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
        let decodedToken = jwt.verify(token, "Leewayhertz");
        if (!decodedToken)
            return res.status(400).send({ status: false, msg: "Invalid Token" })
        else {
            req["decodedToken"] = decodedToken
        }
        next();
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const authorisation = async function (req, res, next) {
    try {
        let tokenId = req.decodedToken.adminId
        let userData = await admin.findOne().select({ _id: 1 })
        let userId = userData._id.toString()
        if (tokenId != userId)
            return res.status(401).send({ status: false, msg: 'User logged is not allowed to modify the requested data' })
        next();
    } 
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = {authentication, authorisation}