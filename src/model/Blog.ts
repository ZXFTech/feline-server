import {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
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
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Tag } from "./Tag";
import { User } from "./User";
type BlogAssociations = "tags" | "user";

export class Blog extends Model<
  InferAttributes<Blog, { omit: BlogAssociations }>,
  InferCreationAttributes<Blog, { omit: BlogAssociations }>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare author: string;
  declare content: string;
  declare likes?: number;
  declare delete?: boolean;

  // Blog belongsToMany Tag (as Tags)
  declare tags?: NonAttribute<Tag[]>;
  declare getTags: BelongsToManyGetAssociationsMixin<Tag>;
  declare setTags: BelongsToManySetAssociationsMixin<Tag, number>;
  declare addTag: BelongsToManyAddAssociationMixin<Tag, number>;
  declare addTags: BelongsToManyAddAssociationsMixin<Tag, number>;
  declare createTag: BelongsToManyCreateAssociationMixin<Tag>;
  declare removeTag: BelongsToManyRemoveAssociationMixin<Tag, number>;
  declare removeTags: BelongsToManyRemoveAssociationsMixin<Tag, number>;
  declare hasTag: BelongsToManyHasAssociationMixin<Tag, number>;
  declare hasTags: BelongsToManyHasAssociationsMixin<Tag, number>;
  declare countTags: BelongsToManyCountAssociationsMixin;

  // Blog belongsTo User
  declare user?: NonAttribute<User>;
  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

  declare static associations: {
    tags: Association<Blog, Tag>;
    user: Association<Blog, User>;
  };

  static initModel(sequelize: Sequelize): typeof Blog {
    Blog.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "feline",
        },

        content: {
          type: DataTypes.TEXT,
          defaultValue: "",
          allowNull: false,
        },
        likes: {
          type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
          defaultValue: 0,
        },
        delete: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        createdAt: "gmtCreate",
        updatedAt: "gmtUpdate",
      }
    );
    return Blog;
  }
}
