module.exports = function(sequelize, DataTypes) {
  var Sheet = sequelize.define("Sheet", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });
  
  return Sheet;
};