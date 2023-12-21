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
      Order.belongsToMany(models.User, {through: "Review", foreignKey: "id_order"})
    }
  }
  Order.init(
    {
      id_items_device: {
        type: DataTypes.INTEGER,
        references: {
          model: "Item_devices",
          key: "id",
        },
      },
      id_service: {
        type: DataTypes.INTEGER,
        references: {
          model: "Services",
          key: "id",
        },
      },
      order_date: DataTypes.DATE,
      qty: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};