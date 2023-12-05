"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      nik: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      password_salt: DataTypes.STRING,
      telephone: DataTypes.STRING,
      address: DataTypes.STRING,
      photo: DataTypes.STRING,
      id_role: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
