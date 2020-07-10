'use strict';
const {
  Model
} = require('sequelize');

const { hashingPassword } = require('../helpers/hashPassword');

const hashPassword = require('../helpers/hashPassword');

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
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please fill the email field"
        },
        isEmail: {
          msg: "Invalid Email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please fill the password field"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashingPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};