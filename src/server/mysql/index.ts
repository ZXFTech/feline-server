import { Sequelize } from "sequelize";

import { mysqlConfig } from "../../config/config";

export const mysqlSequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.user,
  mysqlConfig.password,
  {
    dialect: "mysql",
    logging: console.log,
    pool: {
      max: 10,
      acquire: 60000,
      idle: 30000,
    },
  }
);
