import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db-sequelize";
import Wallet from "./wallet";
import { UserRole, UserStatus } from "../utils/types";

class User extends Model {
  public userId!: number;
  public role!: UserRole; 
  public status!: UserStatus;
  public verified!: boolean;
  public email!: string;
  public username!: string;
  public password!: string;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.GENERAL,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(UserStatus)),
      allowNull: false,
      defaultValue: UserStatus.ACTIVE,
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
