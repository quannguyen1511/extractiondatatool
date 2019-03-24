var config = require("./../config").mongodb;
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`,
  { useNewUrlParser: true }
);
