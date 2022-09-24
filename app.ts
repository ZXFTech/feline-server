import Koa from "koa";
import http from "http";

const app = new Koa();

const server: http.Server = new http.Server(app.callback());

app.use(async (ctx) => {
  ctx.body = "Hello Koa";
});

app.listen(3000, () => {
  console.log("server start at prot 3000");
  console.log(process.env.NODE_ENV);
});
