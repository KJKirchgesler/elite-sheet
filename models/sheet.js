module.exports = function(sequelize, DataTypes) {
  var Sheet = sequelize.define("Sheet", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });

  Sheet.associate = function(models) {
  	Sheet.hasMany(models.Transaction);
  }
  
  return Sheet;
};