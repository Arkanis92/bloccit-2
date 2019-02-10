'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advertisement_1 = sequelize.define('Advertisement_1', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Advertisement_1.associate = function(models) {
    // associations can be defined here
  };
  return Advertisement_1;
};