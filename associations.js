var db = require("./models");

db.User.belongsToMany(db.Sheet, {through: 'UserSheet'});
db.Sheet.belongsToMany(db.User, {through: 'UserSheet'});