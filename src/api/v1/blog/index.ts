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
import { ParamsException } from "../../../core/HttpException";

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
  const blog: any = (ctx.request.body as any).data;
  const result = await updateBlog(blog);
  ctx.body = result;
});

router.post("/add", async (ctx) => {
  const blog: any = (ctx.request.body as any).data;
  console.log("blog", blog);
  const validator = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().required(),
    tags: Joi.array(),
    author: Joi.string(),
    likes: Joi.number(),
  }).validate(blog);
  if (validator.error) {
    console.log("validator.error.message", validator.error.message);
    throw new ParamsException(validator.error.message);
  } else {
    const result = await addBlog(blog as FBlog);
    ctx.body = result;
  }
});

router.get("/tags", async (ctx) => {
  const result = await getTags();
  ctx.body = result;
});

export default router;
