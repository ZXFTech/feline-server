import { Context, Next } from "koa";
import { AuthFailed } from "../core/HttpException";
import jwt, { verify } from "jsonwebtoken";
import { tokenConfig } from "../config/config";
import { userInfo } from "os";

export const crossOrigin = async (ctx: Context, next: Next) => {
  // ctx.set("Access-Control-Allow-Origin", "http://localhost:5173");
  // ctx.set("Content-Type", "application/json");
  // ctx.set("Accept", "application/json, text/plain, */*");
  // ctx.set("Accept-Language", "zh-CN,en-US");
  // ctx.set("Content-Language", "zh-CN,en-US");

  ctx.append("Access-Control-Allow-Origin", "*");
  // ctx.append("Content-Type", "*/*");
  // ctx.append("Accept", "*/*");
  // ctx.append("Accept-Language", "*");
  // ctx.append("Content-Language", "*");
  // ctx.append("Access-Control-Allow-Headers", "POST,GET,OPTIONS,DELETE'");

  await next();
};

export const checkToken = async (ctx: Context, next: Next) => {
  if (ctx.url !== "/api/user/register" && ctx.url !== "/api/user/login") {
    const token = ctx.request.header["token"] as string;
    if (!token) {
      throw new AuthFailed("用户未登录!");
    }
    verify(token, tokenConfig.secret, async (err, decode) => {
      if (err) {
        throw new AuthFailed(err.message);
      }
    });
    await next();
  } else {
    await next();
  }
};
