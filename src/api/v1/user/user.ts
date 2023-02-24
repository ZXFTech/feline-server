import Router from "koa-router";

const router = new Router({
  prefix: "/user",
});


router.get('/user/info')