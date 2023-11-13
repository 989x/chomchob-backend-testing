import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db-sequelize";
import Wallet from "./wallet";
import { UserRole } from "../utils/types";

class User extends Model {
  public id!: number;
  public role!: UserRole; 
  public verified!: boolean;
  public email!: string;
  public username!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "general",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.hasOne(Wallet, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Wallet.belongsTo(User, { foreignKey: "userId" });

export default User;
