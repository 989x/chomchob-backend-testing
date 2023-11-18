import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequelize";

class UserCard extends Model {
  public userCardId!: number;
  public userId!: number;
  public maskPan!: string;
  public cardHolderName!: string;
  public expirationDate!: Date;
  public cvv!: string;
  public cardType!: string; 
  public isActive!: boolean;
}

UserCard.init(
  {
    userCardId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maskPan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardHolderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, 
    },
  },
  {
    sequelize,
    modelName: "userCards",
  }
);

export default UserCard;
