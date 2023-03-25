import { Models } from "../../common/typings/model";
// import pool from "./pool";
import { dataBaseFailed } from "../../core/HttpException";
import { lineToHumpObject } from "../../common/utils/utils";
import {
  BaseEntity,
  DataSource,
  DataSourceOptions,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  Repository,
} from "typeorm";
import { mysqlConfig } from "../../config/config";
import { BlogComment } from "../../entity/comment";

import Blog from "../../entity/BlogEntity";
import "reflect-metadata";
import { config } from "process";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "hg178ar6",
  database: "feline",
  entities: [Blog, BlogComment],
  synchronize: true,
  logging: false,
});

const a = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "hg178ar6",
  database: "feline",
  entities: [Blog, BlogComment],
  synchronize: true,
  logging: false,
};

export class MysqlDataSource {
  constructor(
    //   {
    //   type,
    //   host,
    //   port,
    //   username,
    //   password,
    //   database,
    //   entities,
    //   synchronize,
    //   logging,
    // }:{
    config: DataSourceOptions
  ) {
    this.appDataSource = new DataSource(config);
  }
  private appDataSource;

  public initialize = (callback: CallableFunction) => {
    if (this.appDataSource) {
      this.appDataSource
        .initialize()
        .then(() => {
          console.log("Data source has been initialized!");
          callback();
        })
        .catch((err) => {
          console.log("Data Source initials failed! error\n", err);
        });
    }
  };

  public getRepository(entity: EntityTarget<ObjectLiteral>) {
    return this.appDataSource.getRepository(entity);
  }
}

const mysqlDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "hg178ar6",
  database: "feline",
  entities: [Blog, BlogComment],
  synchronize: true,
  logging: false,
});

export default mysqlDataSource;
