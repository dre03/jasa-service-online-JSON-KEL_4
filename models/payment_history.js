'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment_history.belongsTo(models.Payment, { foreignKey: "id_payment" });
    }
  }
  Payment_history.init(
    {
      id_payment: {
        type: DataTypes.INTEGER,
        references: {
          model: "Payments",
          key: "id",
        },
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Payment_history",
    }
  );
  return Payment_history;
};