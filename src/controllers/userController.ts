import { Request, Response } from "express";
import { createUser } from "../services/userService";

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

    }catch(error:unknown){
        res.status(500).json('internal server error')
    }
}

