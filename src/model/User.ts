import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  InferCreationAttributes,
  InferAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import type { Blog } from "./Blog";

type UserAssociations = "blogs";

export class User extends Model<
  InferAttributes<User, { omit: UserAssociations }>,
  InferCreationAttributes<User, { omit: UserAssociations }>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare sex: "1" | "0" | "99" | null;
  declare email: string | null;
  declare avatar: string | null;
  declare level: "0" | "1";
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // User hasMany Blog
  declare blogs?: NonAttribute<Blog[]>;
  declare getBlogs: HasManyGetAssociationsMixin<Blog>;
  declare setBlogs: HasManySetAssociationsMixin<Blog, number>;
  declare addBlog: HasManyAddAssociationMixin<Blog, number>;
  declare addBlogs: HasManyAddAssociationsMixin<Blog, number>;
  declare createBlog: HasManyCreateAssociationMixin<Blog>;
  declare removeBlog: HasManyRemoveAssociationMixin<Blog, number>;
  declare removeBlogs: HasManyRemoveAssociationsMixin<Blog, number>;
  declare hasBlog: HasManyHasAssociationMixin<Blog, number>;
  declare hasBlogs: HasManyHasAssociationsMixin<Blog, number>;
  declare countBlogs: HasManyCountAssociationsMixin;

  declare static associations: {
    blogs: Association<User, Blog>;
  };

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        username: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: true,
        },
        sex: {
          type: DataTypes.ENUM("1", "0", "99"),
        },
        email: {
          type: DataTypes.STRING,
        },
        avatar: {
          type: DataTypes.STRING,
        },
        level: {
          type: DataTypes.ENUM("0", "1"),
          defaultValue: "0",
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      }
    );

    return User;
  }
}
