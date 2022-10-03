import Router from "koa-router";

import {
  Success,
  HttpException,
  AuthFailed,
  ParamsException,
} from "../../core/HttpException";

const router = new Router({
  prefix: "/api/v1",
});

router.get("/test", async (ctx) => {
  const { id } = ctx.request.body as any;
  const token = ctx.header["authorization"] || ctx.cookies.get("authorization");
  if (!token) {
    throw new AuthFailed("未登录");
  }
  if (typeof id !== "number") {
    throw new ParamsException("缺少参数 id");
  }
  throw new Success("test");
});

export default router;
