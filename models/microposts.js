'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Microposts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Microposts.init({
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    message: DataTypes.STRING,
    delete_flag: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Microposts',
  });
  Microposts.associate = (models) => {
    Microposts.hasMany(models.User, {
      foreignKey: 'id',
      sourceKey: 'user_id'
    });
  }
  return Microposts;
};