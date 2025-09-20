import { Request, Response } from "express";
import {
  createCustomHaircut,
  deleteCustomHaircut,
  getAllHaircuts,
  openForBusiness,
  closedForBusiness,
  updateBarberHaircut,
  fetchAllTemplates
} from "../services/barberService";

export const allTemplates = async (req: Request, res: Response) => {
  /*
    1.pull the users id from the req body that was passed from 
        auth middleware
    2. create a service layer method called customeHaircut
    3. await the creation at the controller level
    4. place the request in a try catch block and catch any errors here
    
    */
  if (req.user.role !== "barber") {
    return res
      .status(403)
      .json({ error: "Only barbers can access haircut templates" });
  }

  const barberId = req.user.sub;

  try {
    const templates = await fetchAllTemplates(barberId)
    return res.status(201).json(templates);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: (err as Error).message });
  }
};


export const createHaircut = async (req: Request, res: Response) => {
  /*
    1.pull the users id from the req body that was passed from 
        auth middleware
    2. create a service layer method called customeHaircut
    3. await the creation at the controller level
    4. place the request in a try catch block and catch any errors here
    
    */
  if (req.user.role !== "barber") {
    return res
      .status(403)
      .json({ error: "Only barbers can create barber specific haircuts" });
  }

  const barberId = req.user.sub;

  try {
    const { haircutTemplate, customPrice, customDuration, styleNotes } =
      req.body;
      console.log("req body", req.body)
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

  if (req.user.role !== "barber") {
    return res
      .status(403)
      .json({ error: "Only barbers can update barber specific haircuts" });
  }

  const barberId = req.user.sub;
  try {
    const { haircutId } = req.params;
    const updated = await updateBarberHaircut(barberId, haircutId, req.body);
    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ err: (err as Error).message });
  }
};

export const deleteHaircut = async (req: Request, res: Response) => {
  if (req.user.role !== "barber") {
    return res
      .status(403)
      .json({ error: "Only barbers can delete barber specific haircuts" });
  }

  const barberId = req.user.sub;
  try {
    const { haircutId } = req.params;
    await deleteCustomHaircut(barberId, haircutId);
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(404).json({ err: (err as Error).message });
  }
};

export const allHaircuts = async (req: Request, res: Response) => {
  if (req.user.role !== "barber") {
    return res
      .status(403)
      .json({ error: "Only barbers can fetch barber specific haircuts" });
  }

  const barberId = req.user.sub;
  try {
    const haircuts = await getAllHaircuts(barberId);
    return res.status(200).json(haircuts);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: (err as Error).message });
  }
};

export const openBarberQueue = async (req: Request, res: Response) => {
  if (req.user.role !== "barber") {
    return res.status(403).json({ error: "Only barbers can open a queue" });
  }

  const barberId = req.user.sub;
  try {
    const queue = await openForBusiness(barberId);
    return res.status(201).json(queue);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: (err as Error).message });
  }
};

export const closeBarberQueue = async (req: Request, res: Response) => {
  if (req.user.role !== "barber") {
    return res.status(403).json({ error: "Only barbers can close a queue" });
  }

  const barberId = req.user.sub;

  try {
    const queue = await closedForBusiness(barberId);
    return res.status(200).json(queue);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: (err as Error).message });
  }
};
