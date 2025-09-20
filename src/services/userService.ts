import { signToken } from "../auth/jwt";
import User from "../models/User";
import { UserDto } from "../types";

export const createUser = async (data: UserDto) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    const error = new Error("Email is already taken!") as Error & {
      statusCode?: number;
    };
    error.statusCode = 409;
    throw error;
  }

  const newUser = await User.create({
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role,
  });
  return newUser;
};

export const loginUser = async (data: UserDto) => {
  const existingUser = await User.findOne({ email: data.email }).select(
    "+password"
  );
  if (!existingUser) {
    const error = new Error("Incorrect email or password") as Error & {
      statusCode?: number;
    };
    error.statusCode = 401;
    throw error;
  }

  const ok = await existingUser.comparePassword(data.password);
  if (!ok) {
    const error = new Error("Incorrect email or password") as Error & {
      statusCode?: number;
    };
    error.statusCode = 401;
    throw error;
  }

  const payload = { sub: existingUser.id, role: existingUser.role };

  const token = signToken(payload);
  return { token, payload };
};
