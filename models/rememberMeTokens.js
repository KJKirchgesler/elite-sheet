var bcrypt = require("bcrypt-nodejs");

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

  }, {
    hooks: {
      beforeCreate: function (user, options) {
        user.token = bcrypt.hashSync(user.token, bcrypt.genSaltSync(10), null);
        options.individualHooks = true;
      },
    }
  });
  return RememberMeTokens;
};