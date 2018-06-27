module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {

    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    companyId: {
      type: DataTypes.INTEGER,
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
  
  return Transaction;
};