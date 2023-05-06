import Router from "koa-router";
import serve from "koa-static";

const router = new Router({
  prefix: "/file",
});

router.post("/img", (ctx) => {
  console.log("ctx.", ctx);
  ctx.body = "got it!";
});

export default router;
