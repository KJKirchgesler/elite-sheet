module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {

    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },

    vendorId: {
      type: DataTypes.STRING,
      allowNull: false
    },

    total: {
      type: DataTypes.DECIMAL(11,2),
      allowNull: false
    }

  });

  Transaction.associate = function(models) {
  	Transaction.belongsTo(models.Sheet, {
      foreignKey: {
        allowNull: true
      }
    });
  }
  
  return Transaction;
};