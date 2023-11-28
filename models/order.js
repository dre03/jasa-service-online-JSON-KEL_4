'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    id_service: {
      type: DataTypes.INTEGER,
      references: {
        model: "Orders",
        key: "id"
      }
    },
    tanggal_order: DataTypes.DATE,
    qty_device: DataTypes.INTEGER,
    status_order: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};