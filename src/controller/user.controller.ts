import { Op } from "sequelize";
import { User } from "../model";
import { FUser } from "../types/user.types";
import { AuthFailed, QueryFailed, Success } from "../core/HttpException";
import { createUserToken } from "../utils/token";
import crypto from "crypto";

export const login = async (username: string, password: string) => {
  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    throw new AuthFailed("用户不存在!");
  }

  const userPassword = crypto.privateDecrypt(username, Buffer.from(password));

  const decodePassword = crypto.privateEncrypt(
    username,
    Buffer.from(user.password)
  );

  if (userPassword !== decodePassword) {
    throw new AuthFailed("密码错误!");
  }
  const token = createUserToken(user);
  return new Success({
    token,
    ...user,
    password: undefined,
  });
};

export const register = async (user: FUser) => {
  const findUser = await User.findOne({
    where: {
      [Op.or]: [{ username: user.username }, { email: user.email }],
    },
  });
  if (findUser) {
    throw new QueryFailed(
      findUser.username === user.username ? "用户名重复!" : "邮箱已被注册!"
    );
  }

  const userData = await User.create(user);

  const token = createUserToken(userData);
  return new Success({
    token,
    ...userData,
    password: undefined,
  });
};
