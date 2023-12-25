'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {foreignKey: "id_role"});
      User.hasMany(models.Order, {foreignKey: "id_user"});
      // User.belongsToMany(models.Order, {through: "Review", foreignKey: "id_user"});
    }
  }
  User.init({
    id_role: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        key: "id"
      }
    },
    name: DataTypes.STRING,
    nik: DataTypes.STRING,
    gender: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordSalt: DataTypes.STRING,
    telephone: DataTypes.STRING,
    address: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};