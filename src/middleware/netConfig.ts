import { Context, Next } from "koa";

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
