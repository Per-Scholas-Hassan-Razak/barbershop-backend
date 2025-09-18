import { Request, Response } from "express";
import { createUser, loginUser } from "../services/userService";

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      const error = new Error("Validation Error");
      error.name = "ValidationError";
      (error as any).statusCode = 400;
      throw error;
    }
    const newUser = await createUser(req.body);
    return res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error && err.name === "ValidationError") {
      return res
        .status((err as any).statusCode || 400)
        .json({ error: err.message });
    }

    if (err instanceof Error && (err as any).code === 11000) {
      return res.status(409).json({ error: "Duplicate field value" });
    }

    console.error("Unexpected error in registerNewUser:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginExistingUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await loginUser({ username, email, password });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json("internal server error");
  }
};
