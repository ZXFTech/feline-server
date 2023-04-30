import Router from "koa-router";
import "reflect-metadata";
import {
  addBlog,
  getBlog,
  getBlogList,
} from "../../../controller/blog.controller";
import { FBlog } from "../../../types/blog.types";

// console.log("mysqlDataSource111", mysqlDataSource);

// blogList.map(async (blog) => {
//   await blogRepository.insert(blog);
// });

const router = new Router({
  prefix: "/blog",
});

router.get("/list", async (ctx) => {
  const { pageNum, pageSize } = ctx.request.query as any;
  const result = await getBlogList(pageNum - 1, pageSize);
  ctx.body = result;
});

router.get("/detail", async (ctx) => {
  const { id } = ctx.request.query as any;
  const result = await getBlog(id);
  ctx.body = result;
});

// router.get("/add", async (ctx) => {
//   const result = await addBlog(blog);
//   ctx.body = result;
// });

router.post("/add", async (ctx) => {
  const blog: unknown = ctx.request.body?.data;
  const result = await addBlog(blog as FBlog);
  ctx.body = result;
});

export default router;
