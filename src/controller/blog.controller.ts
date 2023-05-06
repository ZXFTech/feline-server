import Joi from "joi";

import { QueryFailed, Success } from "../core/HttpException";
import { FBlog } from "../types/blog.types";
import { Blog, Tag, User } from "../model";

export const getBlogList = async (pageNum: number, pageSize: number) => {
  try {
    const result = await Blog.findAll();
    return new Success(result);
  } catch (err: any) {
    console.log("err", err);
    throw new QueryFailed(err.original.sqlMessage);
  }
};

export const getBlog = async (id: number) => {
  try {
    const result = await Blog.findOne({
      where: {
        id,
      },
      include: {
        model: Tag,
        as: "tags",
      },
    });
    return new Success(result);
  } catch (err: any) {
    throw new QueryFailed(err.original.sqlMessage);
  }
};

export const getTags = async () => {
  try {
    const result = await Tag.findAll();
    return new Success(result);
  } catch (err: any) {
    throw new QueryFailed(err.original.sqlMessage);
  }
};

export const addBlog = async (blog: FBlog) => {
  try {
    (blog as any).user = blog.author;
    const blogData = await Blog.create(
      {
        ...blog,
      },
      {
        include: {
          model: User,
          as: "author",
        },
      }
    );
    const tags = await Tag.bulkCreate(blog.tags as Tag[], {
      updateOnDuplicate: ["color"],
    });
    const result = await blogData.setTags(tags);

    return new Success(result);
  } catch (err: any) {
    console.log("err", err);
    throw new QueryFailed(err.original.sqlMessage);
  }
};

export const updateBlog = async (blog: FBlog) => {
  if (blog.id !== undefined) {
    try {
      const blogData = await Blog.findOne({
        where: {
          id: blog.id,
        },
        include: {
          model: Tag,
          as: "tags",
        },
      });
      if (!blogData) {
        throw new QueryFailed("id 对应博客不存在!");
      }
      const tags = await Tag.bulkCreate([...(blog.tags as Tag[])] || [], {
        updateOnDuplicate: ["color"],
      });
      const result = await blogData.setTags(tags, {
        updateOnDuplicate: ["BlogId", "name", "gmtUpdate", "gmtCreate"],
      });

      // const result = blogData.setTags([{
      //   name:'tag'
      // }])
      // const result = await blogData.update(
      //   { ...blog },
      //   {
      //     where: {
      //       id: blog.id,
      //     },
      //   }
      // );
      return new Success(result);
    } catch (err: any) {
      console.log("err", err);
      throw new QueryFailed(err.original.sqlMessage);
    }
  }
  throw new QueryFailed("id 对应博客不存在!");
};
