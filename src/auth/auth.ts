import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import  { verifyToken } from '../auth/jwt'
import { UserDto } from "../types";

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const requireAuth =  (req:Request, res:Response, next:NextFunction) => {

    const authHeaders = req.headers.authorization || ""

    if(!authHeaders.startsWith("Bearer ")){
        return res.status(401).json({error:"Authentication required"})
    }

    const token = authHeaders.slice(7)

    try{
        const payload = verifyToken(token)
        req.user = payload
        next()
    }catch(error){
        return res.status(401).json({error:"Invalid or expired token"})
    }
}

