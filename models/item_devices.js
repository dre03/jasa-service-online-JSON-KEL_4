'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item_devices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item_devices.init({
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    name_device: DataTypes.STRING,
    brand_device: DataTypes.STRING,
    type_device: DataTypes.STRING,
    problem_description: DataTypes.STRING,
    photo_device: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Item_devices',
  });
  return Item_devices;
};