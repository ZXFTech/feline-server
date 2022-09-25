import Router from "koa-router";

const router = new Router({
  prefix: "/api/v1",
});

router.get("/test", async (ctx) => {
  ctx.body = "test";
});

export default router;
