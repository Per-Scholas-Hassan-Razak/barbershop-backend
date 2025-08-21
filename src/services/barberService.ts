import e from "express";
import Barber from "../models/Barber";

export const createBarber = async(data:any) => {
    const {name,email} = data
    const newBarber = new Barber(data);
    return await newBarber.save();
}