import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db-sequelize";
import Coin from "./coin";

class Collect extends Model {
  public collectId!: number;
  public walletId!: number;
  public quantity!: number;
  public coinId!: number;

  public readonly Coin?: Coin;
}

Collect.init(
  {
    collectId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    coinId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "collects",
  }
);

Collect.belongsTo(Coin, { foreignKey: "coinId" });

export default Collect;
