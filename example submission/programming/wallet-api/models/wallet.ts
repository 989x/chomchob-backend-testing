import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db-sequelize";
import Coin from "./coin";
import Collect from "./collect";

class Wallet extends Model {
  public walletId!: number;
  public currency!: number;
  public balance!: number;
  public userId!: number;
}

Wallet.init(
  {
    walletId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USD",
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

Wallet.belongsToMany(Coin, {
  through: Collect,
  foreignKey: "walletId",
  otherKey: "coinId",
});

export default Wallet;
