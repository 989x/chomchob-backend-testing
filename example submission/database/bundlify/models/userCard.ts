import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequelize";

class UserCard extends Model {
  public userCardId!: number;
  public userId!: number;
  public maskPan!: string;
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
  },
  {
    sequelize,
    modelName: "userCards",
  }
);

export default UserCard;
