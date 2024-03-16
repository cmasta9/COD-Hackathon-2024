const Keyv = require('keyv');
const pets = new Keyv('sqlite://database/userdata.sqlite');
module.exports = { pets: pets };