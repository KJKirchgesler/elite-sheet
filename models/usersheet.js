module.exports = function(sequelize, DataTypes) {
 var UserSheet = sequelize.define('UserSheet', {
   userSheetId: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true
   },

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