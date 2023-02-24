import Router from "koa-router";

import blogList from "./blog.json";

const router = new Router({
  prefix: "/blog",
});

router.get("/list", async (ctx) => {
  ctx.body = blogList;
});

router.get("/detail/:id", async (ctx) => {
  ctx.body = blogList[0];
});

export default router;
