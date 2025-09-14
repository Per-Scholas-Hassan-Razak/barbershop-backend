import { JWTPayload } from "../types";
import jwt from "jsonwebtoken";

/* 
    Using non-null assertion "!" at the end 
    to let TS know that a secret will always exist thus 
    getting rid of the overload error
*/
const JWT_SECRET = process.env.JWT_SECRET!; 

export const signToken = (payload: JWTPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
