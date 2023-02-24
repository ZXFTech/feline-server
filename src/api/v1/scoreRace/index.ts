import Router from "koa-router";

const router = new Router({
  prefix: "/score",
});

router.get("/user/list", (ctx) => {
  const { id } = ctx.params;

  console.log("get Id" + id);

  ctx.body = ["feline", "sary"];
});

router.get("/user/:id", (ctx) => {
  const { id } = ctx.params;

  console.log("get Id" + id);

  ctx.body = {
    userName: "feline",
    nickName: "肚肚",
    score: "999",
  };
});

export default router;
