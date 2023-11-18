import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequelize";
import Item from "./item";
import Bundle from "./bundle";

class ItemInBundle extends Model {
  public itemInBundleId!: number;
  public bundleId!: number;
  public itemId!: number;
  public quantity!: number;
}

ItemInBundle.init(
  {
    itemInBundleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bundleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "itemsInBundle",
  }
);

ItemInBundle.belongsTo(Bundle, { foreignKey: "bundleId" });
ItemInBundle.belongsTo(Item, { foreignKey: "itemId" });

export default ItemInBundle;
