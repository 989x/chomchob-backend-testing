import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db-sequelize";

class Coin extends Model {
  public coinId!: number;
  public symbol!: string;
  public name!: string; 
  public exchangeRate!: number;
}

Coin.init(
  {
    coinId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchangeRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: "coins",
  }
);

export default Coin;
