import Koa, { Context } from "koa";
import http from "http";
import "reflect-metadata";

import staticResource from "koa-static";

import initCore from "./src/core/Init";

import Config from "./src/config/config";
import { mysqlSequelize } from "./src/server/mysql";
import { initModels } from "./src/model";

const app = new Koa();

const server: http.Server = new http.Server(app.callback());

// app.use(staticResource(path.join(__dirname, "static")));

// 中间件 初始化
initCore(app, server, () => {});

initModels(mysqlSequelize);

console.log("数据库连接成功!");
app.listen(Config.HTTP_PORT, () => {
  console.log(`Server start at port ${Config.HTTP_PORT}`);
  console.log(`Operating on ${process.env.NODE_ENV}`);
});
