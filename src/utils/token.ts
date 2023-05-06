import jwt from "jsonwebtoken";
import { tokenConfig } from "../config/config";
import { FUser } from "../types/user.types";
import { User } from "../model";

export const createUserToken = (user: FUser | User) => {
  const token = jwt.sign(
    {
      userName: user.username,
      password: user.password,
      email: user.password,
      id: user.id,
    },
    tokenConfig.secret,
    {
      expiresIn: tokenConfig.expiresIn,
    }
  );
  return token;
};

// export const checkToken = (ctx) => {

//   const authorization
//   return jwt.verify()
// }
