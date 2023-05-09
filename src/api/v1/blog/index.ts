import Router from "koa-router";
import Joi from "joi";
import "reflect-metadata";
import { FBlog } from "../../../types/blog.types";
import {
  addBlog,
  getBlog,
  getBlogList,
  getTags,
  updateBlog,
} from "../../../controller/blog.controller";
import { verify } from "jsonwebtoken";
import { tokenConfig } from "../../../config/config";

const router = new Router({
  prefix: "/blog",
});

router.get("/list", async (ctx) => {
  const { pageNum, pageSize } = ctx.request.query as any;
  const res = await getBlogList(pageNum - 1, pageSize);
  ctx.body = res;
});

router.get("/detail", async (ctx) => {
  const { id } = ctx.request.query as any;
  const result = await getBlog(id);
  ctx.body = result;
});

router.post("/update", async (ctx) => {
  const blog: any = ctx.request.body as any;
  const result = await updateBlog(blog);
  ctx.body = result;
});

router.post("/add", async (ctx) => {
  const blog: FBlog = ctx.request.body as any;
  const token = ctx.request.header["token"] as string;
  let userInfo;
  verify(token, tokenConfig.secret, (err, decode) => {
    const { username, id } = decode as any;
    blog.author = username;
    blog.userId = id;
    userInfo = decode;
  });
  const result = await addBlog(blog as FBlog, (userInfo as any).id);
  ctx.body = result;
  // }
});

router.get("/tags", async (ctx) => {
  const result = await getTags();
  ctx.body = result;
});

export default router;
