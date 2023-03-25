import { MysqlError } from "mysql";
import { QueryError } from "mysql2";

export const createTables =
  "CREATE TABLE IF NOT EXISTS blog (id INT AUTO_INCREMENT,title VARCHAR(100) NOT NULL,author VARCHAR(40) NOT NULL,content TEXT NOT NULL,likes INT ,gmt_created DATETIME DEFAULT NOW(),PRIMARY KEY (id))ENGINE=INNODB CHARSET=utf8;";

export const handleError = (err: any) => {
  return { errMessage: err };
};

export const handleSuccess = (message: string, data: any) => {
  return { message, data };
};
