'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      id_order: {
        type: DataTypes.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};