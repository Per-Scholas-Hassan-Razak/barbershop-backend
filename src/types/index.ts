export interface JWTPayload{
    sub:number, 
    role:string
}

export interface UserDto{
    username:string
    email:string
    password:string
    role?:string
}


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "customer" | "barber" | "admin";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

