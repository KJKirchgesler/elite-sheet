module.exports = function(sequelize, DataTypes) {
  var UserSheet = sequelize.define("UserSheet", {
    // The email cannot be null, and must be a proper email before creation

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 

    sheetId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userIsCreator: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  return UserSheet;
};