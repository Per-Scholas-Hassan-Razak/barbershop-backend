import { Request, Response } from "express";
import * as barberService from "../services/barberService"

export const createBarber = async(req:Request, res:Response) => {
  console.log(req.body)
    try{
        const savedBarber = await barberService.createBarber(req.body)
        res.status(201).json(savedBarber)
    }catch(error){
          if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: 'Unknown error occurred' });
  }
    }
}

export const getAllBarbers = async(req:Request, res:Response) => {
  try{
    const barbers = await barberService.getAllBarbers()
    res.status(200).json(barbers)
  }catch(error){
    res.status(500).json({error: "Server error while fetching barbers"})
  }
}