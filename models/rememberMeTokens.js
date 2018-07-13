module.exports = function(sequelize, DataTypes) {
 var RememberMeTokens = sequelize.define('RememberMeTokens', {

    token: {
      type: DataTypes.STRING,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });

  return RememberMeTokens;
};