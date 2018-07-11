module.exports = function(sequelize, DataTypes) {
 var UserSheet = sequelize.define('UserSheet', {
   userSheetId: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true
   },

   userId: {
     type: DataTypes.INTEGER,
     allowNull: false,
     unique: false
   },

   sheetId: {
     type: DataTypes.INTEGER,
     allowNull: false, 
     unique: false
    },

    userIsCreator: {
     type: DataTypes.INTEGER,
     allowNull: false
    }
  });

  UserSheet.associate = (models) => {
    UserSheet.belongsTo(models.User, {
      foreignKey: "userId",
    });

    UserSheet.belongsTo(models.Sheet, {
      foreignKey: "sheetId",
    });
  }

 
  return UserSheet;
};