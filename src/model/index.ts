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
    foreignKey: "name",
    onDelete: "CASCADE",
  });
  Tag.belongsToMany(Blog, {
    as: "blogs",
    through: "BlogTag",
    foreignKey: "blogId",
    sourceKey: "name",
    onDelete: "CASCADE",
  });
  User.hasMany(Blog, {
    as: "blogs",
    foreignKey: "blogId",
  });
  Blog.belongsTo(User, {
    as: "user",
    foreignKey: "userId",
  });

  sequelize.sync({ force: true });

  return {
    Blog,
    Tag,
    User,
  };
}
