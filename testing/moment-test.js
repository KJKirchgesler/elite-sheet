var moment = require('moment-timezone');
// var now = moment().tx("");

// console.log(moment("2018-06-30 17:04:35 GMT").format());
var zones = moment.tz.names();
// console.log(JSON.stringify(zones));

var now = moment().tz("Europe/London").format();
console.log(now);

var timeStamp = moment("2018-06-30 17:04:35").tz("Europe/London").format();
console.log(timeStamp)