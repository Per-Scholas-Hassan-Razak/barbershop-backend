import mongoose, {Schema , Model} from "mongoose"
import bcrypt from 'bcrypt'
import { IUser } from "../types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      unique: true,
      minlength: [2, "username must be at least 2 characters"],
      maxlength: [80, "username must be at least 80 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      match: [EMAIL_REGEX, "Invalid email address"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "barber", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: unknown) {
    next(err as mongoose.CallbackError);
  }
});

userSchema.methods.comparePassword = async  function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set("toJSON", {
  transform: (doc, ret: { [key: string]: any }) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User
