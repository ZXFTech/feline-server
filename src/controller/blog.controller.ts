import { stat } from "fs";
import { dataBaseFailed, QueryFailed } from "../core/HttpException";
import connection from "../server/mysql/pool";
import { handleError, handleSuccess } from "../server/mysql/utils";
import { FBlog } from "../types/blog.types";

const DEFAULT_PAGE_NUM = 0;
const DEFAULT_PAGE_SIZE = 20;

export const getBlog = async (id: number) => {
  const statement = `SELECT * FROM blog WHERE id=${id}`;
  try {
    const result = await connection.promise().execute(statement);
    let blog = result[0][0];
    if (blog) {
      return handleSuccess("查询成功!", blog);
    }
    throw new QueryFailed("文章未找到!");
  } catch (error) {
    throw new dataBaseFailed("查询失败! " + error);
  }
};

export const addBlog = async (blog: FBlog) => {
  const statement = `INSERT INTO blog ( title, author, content , likes ${
    blog.gmtCreate ? ",gmt_create" : ""
  }) VALUES ('${blog.title}','${blog.author}','${blog.content}','${
    blog.likes
  }'${blog.gmtCreate ? ",'" + blog.gmtCreate + "'" : ""})`;
  try {
    const result = await connection.promise().execute(statement);
    return handleSuccess("保存成功!", result[0].insertId);
  } catch (error) {
    throw new dataBaseFailed("保存失败! " + error);
  }
};

export const getBlogList = async (
  pageNum: number,
  pageSize: number,
  sortBy: string = "",
  order: 0 | 1 = 1
) => {
  const statement = `SELECT *,(SELECT count(*) FROM blog WHERE 1=1) blogCount FROM blog WHERE 1=1 ORDER BY ${
    sortBy ? sortBy : "id"
  } ${order ? "DESC" : "ASC"} LIMIT ${pageNum || DEFAULT_PAGE_NUM},${
    pageSize || DEFAULT_PAGE_SIZE
  }`;
  try {
    const result = await connection.promise().execute(statement);
    let blogList = result[0];
    const total = blogList[0] ? blogList[0].blogCount : 0;
    const data = {
      pageNum,
      pageSize,
      total,
      list: blogList,
    };
    return handleSuccess("查询完毕.", data);
  } catch (error) {
    throw new dataBaseFailed("查询失败! " + error);
  }
};
