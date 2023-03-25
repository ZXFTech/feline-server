import Koa, { Context } from "koa";
import http from "http";
import "reflect-metadata";

import staticResource from "koa-static";

import initCore from "./src/core/Init";

import Config, { mysqlConfig } from "./src/config/config";
import pool from "./src/server/mysql/pool";
import { createTables } from "./src/server/mysql/utils";
import path from "path";

const app = new Koa();

const server: http.Server = new http.Server(app.callback());

// app.use(staticResource(path.join(__dirname, "static")));

// 中间件 初始化
initCore(app, server, () => {});

pool.getConnection((err, connect) => {
  if (err) throw err;
  connect.connect((error) => {
    if (error) {
      console.log("数据库连接失败!", error);
    } else {
      console.log("数据库连接成功!");
      pool.query(createTables, (err, results, fields) => {
        if (err) {
          throw err;
        } else {
          console.log("数据库初始化完成!");
        }
      });

      app.listen(Config.HTTP_PORT, () => {
        console.log(`Server start at port ${Config.HTTP_PORT}`);
        console.log(`Operating on ${process.env.NODE_ENV}`);
      });
    }
  });
});
