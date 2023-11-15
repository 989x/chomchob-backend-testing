import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db-sequelize";
import { TransactionType } from "../utils/types";

class Transaction extends Model {
  public transactionId!: number;
  public senderId!: number;
  public recipientId!: number;
  public coinId!: number;
  public amount!: number;
  public type!: TransactionType;
}

Transaction.init(
  {
    transactionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coinId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "transactions",
    timestamps: true,
  }
);

export default Transaction;
