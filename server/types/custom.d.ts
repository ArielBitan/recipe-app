import { I_UserDocument } from "../src/models/User";

type IUserWithoutPassword = Omit<I_UserDocument, "password">;

declare global {
  namespace Express {
    interface Request {
      user?: IUserWithoutPassword;
    }
  }
}
