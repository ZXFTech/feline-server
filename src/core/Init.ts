import Koa from "koa";
import http from "http";

import path from "path";

import koaBodyParser from "koa-bodyparser";
import Router from "koa-router";

import blogRouter from "../api/v1/blog";
import scoreRouter from "../api/v1/scoreRace";

import { crossOrigin } from "../middleware/netConfig";

import { errorCatch } from "../middleware/errorCatch";

import { getAllFilesExport } from "../common/utils/utils";

const router = new Router();

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
    Init.loadRouters();
  }

  public static loadBodyParser() {
    Init.app.use(koaBodyParser());
  }

  public static loadRouters() {
    Init.app.use(crossOrigin);
    router.use(blogRouter.routes());
    router.use(scoreRouter.routes());
    Init.app.use(router.routes());
    Init.app.use(router.allowedMethods());
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
