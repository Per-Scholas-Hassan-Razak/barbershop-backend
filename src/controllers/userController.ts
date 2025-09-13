import { Request, Response } from "express";
import { createUser, loginUser } from "../services/userService";

export const registerNewUser = async(req:Request, res:Response) => {
    try{
        const {username, email, password} = req.body
        if(!username || !email || !password){
            const error = new Error("Validation Error") as Error & { statusCode?: number };
            error.statusCode = 400;
            throw error
        }
        const newUser = await createUser(req.body)
        res.status(201).json(newUser)

    }catch(error){
        res.status(500).json('internal server error')
    }
}

export const loginExistingUser = async(req:Request, res:Response) => {
    try{
        const {username, email, password} = req.body
        const user = await loginUser({username, email, password})
        return res.status(200).json(user)
    }catch(error){
        res.status(500).json('internal server error')
    }
}


