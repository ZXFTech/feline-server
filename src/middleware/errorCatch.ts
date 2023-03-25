import koa from "koa";
import { Success, HttpException, FError } from "../core/HttpException";

// import { infoLog, errorLog } from "../server/logs";

export async function errorCatch(ctx: koa.Context, next: Function) {
  try {
    // infoLog(ctx);
    await next();
  } catch (error: any) {
    const isHttpException = error instanceof HttpException;

    if (!isHttpException) {
      // errorLog(ctx, error);
      ctx.body = {
        message: "未知错误",
        code: -1,
        requestUrl: `${ctx.method}/${ctx.path}`,
      } as FError;
    } else {
      if (error.responseType) {
        ctx.response.type = error.responseType;
      }
      // 如果是文件则直接返回文件
      if (error.isBuffer) {
        ctx.body = error.data;
      } else {
        ctx.body = {
          message: error.message,
          data: error.data || undefined,
          code: error.code,
        } as FError;
      }
      ctx.status = error.code;
      // infoLog(ctx);
    }
  }
}
