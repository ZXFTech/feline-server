import Router from "koa-router";
import { login, register } from "../../../controller/user.controller";
import { FUser } from "../../../types/user.types";

const router = new Router({
  prefix: "/user",
});

router.post("/register", async (ctx) => {
  const user: FUser = ctx.request.body as any;
  const result = await register(user);
  ctx.body = result;
});

router.post("/login", async (ctx) => {
  const { username, password } = ctx.request.body as any;
  const result = await login(username, password);
  ctx.body = result;
});

export default router;
