import Koa, { Context } from "koa";
import http from "http";
import "reflect-metadata";

import initCore from "./src/core/Init";

import Config from "./src/config/config";

const app = new Koa();

const server: http.Server = new http.Server(app.callback());

app.use((ctx: Context) => {
  ctx.response.body = "Hello world!";
});

// 中间件 初始化
initCore(app, server);

app.listen(Config.HTTP_PORT, () => {
  console.log(`Server start at port ${Config.HTTP_PORT}`);
  console.log(`Operating on ${process.env.NODE_ENV}`);
});
