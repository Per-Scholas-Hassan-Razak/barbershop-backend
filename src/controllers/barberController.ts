import { Request, Response } from "express";
import {
  createCustomHaircut,
  deleteCustomHaircut,
  updateBarberHaircut,
} from "../services/barberService";

export const createHaircut = async (req: Request, res: Response) => {
  /*
    1.pull the users id from the req body that was passed from 
        auth middleware
    2. create a service layer method called customeHaircut
    3. await the creation at the controller level
    4. place the request in a try catch block and catch any errors here
    
    */

  try {
    const { barberId } = req.params;
    const { haircutTemplate, customPrice, customDuration, styleNotes } =
      req.body;
    const haircut = await createCustomHaircut({
      barberId,
      haircutTemplate,
      customPrice,
      customDuration,
      styleNotes,
    });
    return res.status(201).json(haircut);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: (err as Error).message });
  }
};

export const updateHaircut = async (req: Request, res: Response) => {
  /*
    1. receive req body with update object
    2. receive req params with barberid and haircut id
    3. pass req params and body to service to update resource
    4. await response and throw error if error occirs
*/
  try {
    const { barberId, haircutId } = req.params;
    const updated = await updateBarberHaircut(barberId, haircutId, req.body);
    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ err: (err as Error).message });
  }
};

export const deleteHaircut = async (req: Request, res: Response) => {
  try {
    const { barberId, haircutId } = req.params;
    const deleted = await deleteCustomHaircut(barberId, haircutId);
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(404).json({ err: (err as Error).message });
  }
};
