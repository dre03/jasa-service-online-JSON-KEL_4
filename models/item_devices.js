"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item_devices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item_devices.belongsTo(models.User, {foreignKey: "id_user"})
      Item_devices.belongsToMany(models.Service, {through: "Order", foreignKey: "id_items_device"})

    }
  }
  Item_devices.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name_device: DataTypes.STRING,
      brand_device: DataTypes.STRING,
      type_device: DataTypes.STRING,
      problem_description: DataTypes.STRING,
      photo_device: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Item_devices",
    }
  );
  return Item_devices;
};
