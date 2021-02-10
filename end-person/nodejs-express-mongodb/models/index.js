const dbConfig = require("../config/db.config.js");
console.log(dbConfig.url);
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {}
db.mongoose = mongoose;
db.url = dbConfig.url;
db.registros = require("./personas.registro.js")(mongoose);

module.exports = db;

