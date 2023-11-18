import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequelize";
import UserCard from "./userCard";

class User extends Model {
  public userId!: number;
  public userStatus!: string; 
  public userRole!: string; 
  public email!: string;
  public password!: string;
  public profile!: string;
  public name!: string;
  public phone!: string;
  public address!: string;
  public age!: number;
  public gender!: string;
  public occupation!: string;
  public currency!: string;
  public income!: number;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active", 
    },
    userRole: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user", 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    income: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

User.hasMany(UserCard, { foreignKey: "userId" });

export default User;
