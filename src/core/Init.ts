import Koa from "koa";
import http from "http";

import path from "path";

import koaBodyParser from "koa-bodyparser";
import Router from "koa-router";

import blogRouter from "../api/v1/blog";
import scoreRouter from "../api/v1/scoreRace";
import fileRouter from "../api/v1/file";

import { checkToken, crossOrigin } from "../middleware/netConfig";

import { errorCatch } from "../middleware/errorCatch";

import { getAllFilesExport } from "../common/utils/utils";
import { DataSource } from "typeorm";
import serve from "koa-static";

const router = new Router({
  prefix: "/api",
});

class Init {
  public static app: Koa<Koa.DefaultState, Koa.DefaultContext>;
  public static server: http.Server;
  public static initCore(
    app: Koa<Koa.DefaultState, Koa.DefaultContext>,
    server: http.Server,
    callback: CallableFunction
  ) {
    Init.app = app;
    Init.server = server;
    Init.initErrorCatch();
    Init.initNetConfig();
    Init.loadBodyParser();
    Init.initLoadRouters();
  }

  public static loadBodyParser() {
    this.app.use(koaBodyParser());
  }

  public static loadRouters() {
    router.use(blogRouter.routes());
    router.use(scoreRouter.routes());
    router.use(fileRouter.routes());
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }

  // 自动添加路由方法
  static async initLoadRouters() {
    const dirPath = path.join(`${process.cwd()}/src/api/v1`);
    getAllFilesExport(dirPath, (file: Router) => {
      router.use(file.routes());
    });
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }

  // 文件管理部分
  public static initFileManage() {
    this.app.use(serve(path.join(__dirname, "./api/file/img")));
    this.app.use(serve(path.join(__dirname, "./api/file/others")));
  }

  public static initErrorCatch() {
    this.app.use(errorCatch);
  }

  public static initNetConfig() {
    this.app.use(crossOrigin);
    this.app.use(checkToken);
  }
}

export default Init.initCore;
