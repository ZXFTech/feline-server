import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Blog } from "./Blog";
type TagAssociations = "blogs";

export class Tag extends Model<
  InferAttributes<Tag, { omit: TagAssociations }>,
  InferCreationAttributes<Tag, { omit: TagAssociations }>
> {
  // declare id: CreationOptional<number>;
  declare name: CreationOptional<string>;
  // declare name: string;
  declare color?: string;

  // Tag belongsToMany Blog (as Blogs)
  declare blogs?: NonAttribute<Blog[]>;
  declare getBlogs: BelongsToManyGetAssociationsMixin<Blog>;
  declare setBlogs: BelongsToManySetAssociationsMixin<Blog, number>;
  declare addBlog: BelongsToManyAddAssociationMixin<Blog, number>;
  declare addBlogs: BelongsToManyAddAssociationsMixin<Blog, number>;
  declare createBlog: BelongsToManyCreateAssociationMixin<Blog>;
  declare removeBlog: BelongsToManyRemoveAssociationMixin<Blog, number>;
  declare removeBlogs: BelongsToManyRemoveAssociationsMixin<Blog, number>;
  declare hasBlog: BelongsToManyHasAssociationMixin<Blog, number>;
  declare hasBlogs: BelongsToManyHasAssociationsMixin<Blog, number>;
  declare countBlogs: BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize): typeof Tag {
    Tag.init(
      {
        // id: {
        //   type: DataTypes.INTEGER.UNSIGNED,
        //   primaryKey: true,
        //   autoIncrement: true,
        // },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        color: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
    return Tag;
  }
}
