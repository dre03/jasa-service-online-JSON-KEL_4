'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init(
    {
      id_technician: {
        type: DataTypes.INTEGER,
        references: {
          model: "Technicians",
          key: "id",
        },
      },
      name_service: DataTypes.STRING,
      price_service: DataTypes.INTEGER,
      description_service: DataTypes.STRING,
      status_service: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};