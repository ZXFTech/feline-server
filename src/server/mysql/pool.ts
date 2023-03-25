import mysql from "mysql2";
import { mysqlConfig } from "../../config/config";

const pool = mysql.createPool(mysqlConfig);

export default pool;
