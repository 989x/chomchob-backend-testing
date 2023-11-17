import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequelize";
import UserCard from "./userCard";

class User extends Model {
  public userId!: number;
  public name!: string;
  public age!: number;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

User.hasMany(UserCard, { foreignKey: "userId" });

export default User;
