import mongoose, {Document} from "mongoose"

export interface JWTPayload{
    sub:string; 
   role: "customer" | "barber" | "admin";
}

export interface UserDto{
    username:string
    email:string
    password:string
     role?: "customer" | "barber" | "admin";
}


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "customer" | "barber" | "admin";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface HaircutTemplateDocument extends Document {
  name: string;
  description?: string;
  baseCost: number;
  baseDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BarberHaircutDocument extends Document {
  barber: mongoose.Types.ObjectId;       
  haircutTemplate: mongoose.Types.ObjectId; 
  customPrice?: number;
  customDuration?: number;
  styleNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BarberDocument extends Document {
  user: mongoose.Types.ObjectId | IUser;
  specialties: string[];
  available: boolean;
  shopName?: string; 
  bio?: string; 
  rating?: number;
  review?:string; 
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHaircutInput {
  barberId: string;
  haircutTemplate: string;
  customPrice?: number;
  customDuration?: number;
  styleNotes?: string;
}

export interface UpdateBarberHaircutParams{
  customPrice?:number;
  customDuration?:number;
  styleNotes?:string
}

export interface QueueEntryDocument extends Document{
  customer:mongoose.Types.ObjectId,
  queue:mongoose.Types.ObjectId,
  haircut:mongoose.Types.ObjectId,
  position:number,
  status:"waiting" | "in_progress" | "completed" |"cancelled",
  createdAt:Date,
  updatedAt:Date
}

export interface BarberQueueDocument extends Document {
  barber: mongoose.Types.ObjectId;     
  isOpen: boolean;                     
  startedAt: Date;                     
  closedAt?: Date;                     
}