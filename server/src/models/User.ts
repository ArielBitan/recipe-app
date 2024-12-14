import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

export interface I_UserDocument extends Document {
  username: string;
  password: string;
  email?: string;
  profilePic?: string;
  recipes?: mongoose.Schema.Types.ObjectId[];
}

const userSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: false,
      default: undefined,
    },
    profilePic: {
      type: String,
      required: false,
      default: "https://loremflickr.com/500/500?lock=8792450353592873",
    },
    recipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: false,
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

const User = mongoose.model<I_UserDocument>("User", userSchema);

export default User;
