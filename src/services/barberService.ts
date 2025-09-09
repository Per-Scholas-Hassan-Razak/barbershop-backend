import e from "express";
import Barber from "../models/Barber";

export const createBarber = async(data:any) => {
    const newBarber = new Barber(data);
    return await newBarber.save();
}

export const getAllBarbers = async() => {
    const barbers = Barber.find();
    return await barbers;
}