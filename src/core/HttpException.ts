export interface FError {
  message: string;
  code: number;
  requestUrl?: string;
  data?: any;
  responseType: string;
}

export class HttpException extends Error {
  public message: string;
  public code: number;
  public data: any;
  public isBuffer = false;
  public responseType: string | undefined;
  constructor(data = null, message = "服务器异常，请联系管理员。", code = 400) {
    super();
    this.message = message;
    this.code = code;
    this.data = data;
  }
}

// http 成功请求
export class Success extends HttpException {
  public data: any;
  public responseType: string | undefined;
  public session: string | undefined;
  constructor(
    data?: unknown,
    message = "success",
    code = 200,
    responseType?: string,
    session?: string
  ) {
    super();
    this.code = code;
    this.data = data;
    this.message = message;
    this.responseType = responseType;
    this.session = session;
  }
}

// 返回文件流
export class Buffer extends HttpException {
  public data: any;
  public responseType: string | undefined;
  public session: any;
  constructor(
    data?: unknown,
    message = "success",
    code = 200,
    responseType?: string,
    session?: string
  ) {
    super();
    this.code = code;
    this.data = data;
    this.message = message;
    this.responseType = responseType;
    this.session = session;
  }
}

// http 参数异常
export class ParamsException extends HttpException {
  constructor(message?: string) {
    super();
    this.code = 500;
    this.message = message || "参数错误";
  }
}

// 验权失败
export class AuthFailed extends HttpException {
  constructor(message?: string) {
    super();
    this.code = 401;
    this.message = message || "授权失败";
  }
}

// 查询失败
export class QueryFailed extends HttpException {
  constructor(msg?: string) {
    super();
    this.code = 500;
    this.message = msg || "未查到匹配的数据";
  }
}

// 查询失败
export class dataBaseFailed extends HttpException {
  constructor(msg?: string) {
    super();
    this.code = 500;
    this.message = msg || "数据库出错";
  }
}
