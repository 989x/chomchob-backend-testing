import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db-sequelize";
import { Currency } from "../utils/types";

class Wallet extends Model {
  public id!: number;
  public currency!: Currency;
  public balance!: number;
  public userId!: number;
}

Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    currency: {
      type: DataTypes.ENUM(...Object.values(Currency)),
      allowNull: false,
      defaultValue: Currency.ETH,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "wallets",
  }
);

export default Wallet;
