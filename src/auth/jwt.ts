import { JWTPayload } from "../types"

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET


const signToken = (payload:JWTPayload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn:"1h"})
}

const verifyToken = (token:string) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {signToken, verifyToken}