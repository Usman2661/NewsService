import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "./index";
import { Source } from "./source.model";

export class Article extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public url!: string;
  public publishedAt!: Date;
  public sourceId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface IArticle {
    id?: number;
    title: string;
    description: string;
    url: string;
    publishedAt: Date;
    sourceId:number;
    createdAt?:Date;
    updatedAt?:Date;
}

Article.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: new DataTypes.STRING(255),
        allowNull: false,
        validate:{
            notEmpty: true,
        }
      },
      description: {
        type: new DataTypes.TEXT,
      },
      url: {
        type: new DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isUrl: true
        }
      },
      publishedAt: {
        type: new DataTypes.DATE,
        allowNull: false,
      },
      sourceId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
          notEmpty: true,
        },
        references: {
            model: 'sources',
            key: 'id'
        }
      },
      createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
      updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "articles",
      sequelize: database, 
    }
  );



  
 // Creating one-to-many relationship between source and articles
  Article.belongsTo(Source, {
    foreignKey: "sourceId",
    as: "source", // The name in associations
  });

 // Creating one-to-many relationship between source and articles
  Source.hasMany(Article, {
    sourceKey: "id",
    foreignKey: "sourceId",
    as: "articles",
  });
