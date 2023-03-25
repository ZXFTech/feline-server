import Blog from "../entity/BlogEntity";
import { BlogComment } from "../entity/comment";

const isDev = process.env.NODE_ENV === "develop";

export default class Config {
  // 环境
  public static readonly ENV = isDev;
  // 服务器端口
  public static readonly HTTP_PORT = 9000;
  // 接口前缀
  public static readonly API_PREFIX = "/api/";
  // 根目录
  public static readonly BASE = isDev ? "src" : "dist/src";

  // 默认时间格式
  public static readonly DEFAULT_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

  public static readonly MYSQL = {
    DB_NAME: "feline",
    HOST: "127.0.0.1",
    PORT: 3306,
    USER_NAME: "root",
    PASSWORD: "hg178ar6",
    CONNECTION_LIMIT: 60 * 60 * 1000,
    CONNECT_TIMEOUT: 1000 * 60 * 60 * 1000,
    ACQUIRE_TIMEOUT: 60 * 60 * 1000,
    TIMEOUT: 1000 * 60 * 60 * 1000,
  };
}

export const mysqlConfig = {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: 3306,
  user: "root",
  password: "hg178ar6",
  database: "feline",
};
