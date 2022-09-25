import Koa from "koa";
import http from "http";

import initCore from "./src/core/Init";

const app = new Koa();

const server: http.Server = new http.Server(app.callback());

// 中间件 初始化
initCore(app, server);

app.listen(3000, () => {
  console.log("server start at prot 3000");
  console.log(process.env.NODE_ENV);
});
