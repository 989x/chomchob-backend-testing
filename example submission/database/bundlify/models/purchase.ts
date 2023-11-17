import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequelize";
import UserCard from "./userCard";

class Purchase extends Model {
  public purchaseId!: number;
  public itemId!: number;
  public customerId!: number;
  public purchaseDate!: Date;
  public code!: string;
}

Purchase.init(
  {
    purchaseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'purchases',
  }
);

Purchase.belongsTo(UserCard, { foreignKey: 'userCardId' });

export default Purchase;
