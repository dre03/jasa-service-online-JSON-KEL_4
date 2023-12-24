'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Order, { foreignKey: "id_order" });
      Payment.hasOne(models.Payment_history, { foreignKey: "id_payment" });
    }
  }
  Payment.init(
    {
      id_order: {
        type: DataTypes.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      kode_payment: DataTypes.STRING,
      status_code: DataTypes.STRING,
      status_message: DataTypes.STRING,
      transaction_id: DataTypes.STRING,
      signature_key: DataTypes.STRING,
      merchant_id: DataTypes.STRING,
      currency: DataTypes.STRING,
      gross_amount: DataTypes.STRING,
      payment_type: DataTypes.STRING,
      va_number: DataTypes.STRING,
      transaction_time: DataTypes.STRING,
      transaction_status: DataTypes.STRING,
      settlement_time: DataTypes.STRING,
      fraud_status: DataTypes.STRING,
      expiry_time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};