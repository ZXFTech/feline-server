import Koa from "koa";
import http from "http";

import path from "path";

import koaBodyParser from "koa-bodyparser";
import Router from "koa-router";

import { errorCatch } from "../middleware/errorCatch";

import { getAllFilesExport } from "../common/utils/utils";

class Init {
  public static app: Koa<Koa.DefaultState, Koa.DefaultContext>;
  public static server: http.Server;
  public static initCore(
    app: Koa<Koa.DefaultState, Koa.DefaultContext>,
    server: http.Server
  ) {
    Init.app = app;
    Init.server = server;
    // Init.initErrorCatch();
    Init.loadBodyParser();
    // Init.initLoadRouters();
  }

  public static loadBodyParser() {
    Init.app.use(koaBodyParser());
  }

  // 自动添加路由方法 -- 先不用
  // static async initLoadRouters() {
  //   const dirPath = path.join(`${process.cwd()}/src/api`);
  //   getAllFilesExport(dirPath, (file: Router) => {
  //     Init.app.use(file.routes());
  //   });
  // }

  // 暂时先不加
  // static async initErrorCatch() {
  //   Init.app.use(errorCatch);
  // }
}

export default Init.initCore;
