var db = require("../models");


module.exports = {
	randomString: function (length) {
	  var buf = []
	    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	    , charlen = chars.length;

	  for (var i = 0; i < length; ++i) {
	    buf.push(chars[getRandomInt(0, charlen - 1)]);
	  }

	  return buf.join('');
	}
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function issueToken(userId, done) {
	var token = randomString(64)

	db.RememberMeTokens.create({
		token: token,
		userId: userId
	}).then(function(result) {
		return done(null, result.dataValues.token)
	}).catch(function(err) {
		console.log(err);
	})
}