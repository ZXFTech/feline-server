import Koa from "koa";
import http from "http";

import koaBodyParser from "koa-bodyparser";

import test from "../api/v1/test";

class Init {
  public static app: Koa<Koa.DefaultState, Koa.DefaultContext>;
  public static server: http.Server;
  public static initCore(
    app: Koa<Koa.DefaultState, Koa.DefaultContext>,
    server: http.Server
  ) {
    Init.app = app;
    Init.server = server;
    Init.loadBodyParser();
    Init.initLoadRouters();
  }

  public static loadBodyParser() {
    Init.app.use(koaBodyParser());
  }

  static async initLoadRouters() {
    Init.app.use(test.routes());
  }
}

export default Init.initCore;
