import { Context, Next } from "koa";

export const crossOrigin = async (ctx: Context, next: Next) => {
  ctx.set("Access-Control-Allow-Origin", "http://localhost:5173");
  await next();
};
