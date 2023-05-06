import type { Sequelize, Model } from "sequelize";
import { Blog } from "./Blog";
import { Tag } from "./Tag";
import { User } from "./User";

export { Blog, Tag, User };

export function initModels(sequelize: Sequelize) {
  Blog.initModel(sequelize);
  Tag.initModel(sequelize);
  User.initModel(sequelize);

  Blog.belongsToMany(Tag, {
    as: "tags",
    through: "BlogTag",
    foreignKey: "blogId",
    otherKey: "tagsId",
    onDelete: "CASCADE",
  });
  Blog.belongsTo(User, {
    as: "author",
    foreignKey: "userId",
  });
  Tag.belongsToMany(Blog, {
    as: "blogs",
    through: "BlogTag",
    foreignKey: "tagId",
    otherKey: "blogsId",
    onDelete: "CASCADE",
  });
  User.hasMany(Blog, {
    as: "blogs",
    foreignKey: "userId",
  });

  return {
    Blog,
    Tag,
    User,
  };
}
