import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db-sequelize";
import Coin from "./coin";

class Wallet extends Model {
  public walletId!: number;
  public balance!: number;
  public userId!: number;
  public coinId!: number;

  public updateBalance(amount: number) {
    this.balance += amount;
    return this.save();
  }
}

Wallet.init(
  {
    walletId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    coinId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "wallets",
  }
);

Wallet.belongsTo(Coin, { foreignKey: "coinId" });

export default Wallet;
