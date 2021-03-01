import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "./index";

export class Source extends Model {
  public id!: number;
  public newsApiId!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface ISource {
    id?: number;
    newsApiId?: string;
    name: string;
    createdAt?:Date;
    updatedAt?:Date;
}

Source.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      newsApiId: {
        type: new DataTypes.STRING(32),
      },
      name: {
        type: new DataTypes.STRING(32),
        allowNull:false,
        validate:{
          notEmpty: true,
        },
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
      tableName: "sources",
      sequelize: database, 
    }
  );

  