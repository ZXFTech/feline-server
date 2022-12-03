import Router from "koa-router";

const router = new Router({
  prefix: "/blog",
});

router.get("/list", async (ctx) => {
  ctx.body = "blog list";
});

export default router;
