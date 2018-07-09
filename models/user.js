// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
   // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
     // The password cannot be null
    password: {
       type: DataTypes.STRING,
       allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    resetPasswordToken: {
      type: DataTypes.STRING
    },

    resetPasswordExpires: {
      type: DataTypes.DATE
    }

  }, {
    hooks: {
      beforeCreate: function (user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        options.individualHooks = true;
      },

      beforeUpdate: function (user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        options.individualHooks = true;
      }
    }

  });

  User.associate = (models) => {
    User.belongsToMany(models.Sheet, {
      through: 'UserSheet',
      as: 'Sheet',
      foreignKey: 'userId'
    })

    // User.hasMany(models.UserSheet, {
    //   // as: "User",
    //   foreignKey: "userModelId",
    //    //constraints: false
    // })

  }
   // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};