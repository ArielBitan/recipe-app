import User, { I_UserDocument } from "../models/User";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { getErrorMessage } from "../utils/errors.util";

export async function register(user: I_UserDocument): Promise<void> {
  try {
    await User.create(user);
  } catch (error) {
    throw error;
  }
}

export async function login(user: I_UserDocument) {
  try {
    const { username, password } = user;
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      throw new Error("User not found");
    }

    const isMatch = bcrypt.compareSync(password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          _id: foundUser._id?.toString(),
          username: foundUser.username,
          email: foundUser.email,
          profilePic: foundUser.profilePic,
        },
        process.env.JWT_SECRET as Secret,
        { expiresIn: "2 days" }
      );

      return {
        user: {
          _id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
          profilePic: foundUser.profilePic,
        },
        token,
      };
    } else {
      throw new Error("Incorrect password");
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
  }
}
