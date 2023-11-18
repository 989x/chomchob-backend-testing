import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequelize";
import Purchase from "./purchase";

class Item extends Model {
  public itemId!: number;
  public productName!: string;
  public productDetail!: string;
  public salePrice!: number;
  public normalPrice!: number;
  public openSaleDate!: Date;
  public endSaleDate!: Date;
  public discountPrice?: number;
  public discountStartDate?: Date;
  public discountEndDate?: Date;
}

Item.init(
  {
    itemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDetail: {
      type: DataTypes.TEXT,
    },
    salePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    normalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    openSaleDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endSaleDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    discountPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },
    discountStartDate: {
      type: DataTypes.DATE,
    },
    discountEndDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "items",
  }
);

Item.hasMany(Purchase, { foreignKey: 'itemId' });

export default Item;
