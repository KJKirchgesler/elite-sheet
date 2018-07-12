module.exports = function(sequelize, DataTypes) {
 var Sheet = sequelize.define('Sheet', {

   name: {
     type: DataTypes.STRING,
     allowNull: false
   },

 });

 Sheet.associate = (models) => {
   Sheet.belongsToMany(models.User, {
     through: 'UserSheet',
     as: 'User',
     foreignKey: 'sheetId'
   })

   Sheet.hasMany(models.Transaction, {
     as: 'Transaction',
     foreignKey: 'sheetId'
   })
 }

 return Sheet;
};