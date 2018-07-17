module.exports = function(sequelize, DataTypes) {
 var Transaction = sequelize.define('Transaction', {

   companyName: {
     type: DataTypes.STRING,
     allowNull: false
   },

   invoiceNumber: {
     type: DataTypes.STRING,
     allowNull: false
   },

   vendorNumber: {
     type: DataTypes.STRING,
     allowNull: false
   },
   
   itemNumber: {
     type: DataTypes.INTEGER,
     allowNull: false
   },

   creditNumber: {
     type: DataTypes.STRING,
     allowNull: false
   },

   totalBalance: {
     type: DataTypes.DECIMAL(11,2),
     allowNull: false
   },
   
   dueDate: {
     type: DataTypes.DATE,
     allowNull: false
   },

   amountPastDue: {
     type: DataTypes.DATE,
     allowNull: false
   },

   departmentName: {
     type: DataTypes.STRING,
     allowNull: false
   },

   locationName: {
     type: DataTypes.STRING,
     allowNull: false
   },

   representativeName: {
     type: DataTypes.STRING,
     allowNull: false
   },

   sheetId: {
    type: DataTypes.INTEGER,
    allowNull: false
   }

 });
 
 return Transaction;
};