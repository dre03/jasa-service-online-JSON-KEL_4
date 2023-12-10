'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Technician extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Technician.hasOne(models.Service, { foreignKey: "id_technician" });
    }
  }
  Technician.init({
    name_technician: DataTypes.STRING,
    gender_technician: DataTypes.STRING,
    telephone: DataTypes.STRING,
    specialization: DataTypes.STRING,
    nik_technician: DataTypes.STRING,
    photo_technician: DataTypes.STRING,
    status_technician: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Technician',
  });
  return Technician;
};