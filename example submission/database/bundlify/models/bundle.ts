import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequelize";

class Bundle extends Model {
  public bundleId!: number;
  public bundleName!: string;
  public bundleDescription?: string;
  public bundlePrice!: number;
}

Bundle.init(
  {
    bundleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bundleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bundleDescription: {
      type: DataTypes.TEXT,
    },
    bundlePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "bundles",
  }
);

export default Bundle;
