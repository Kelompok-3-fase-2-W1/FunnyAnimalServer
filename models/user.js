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
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          message: "Please fill the email field"
        },
        isEmail: {
          args: true,
          message: "Email already in use"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          message: "Please fill the password field"
        }
      }
    }
  }, {
    hooks: {
      //beforeCreate utk hash password
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};