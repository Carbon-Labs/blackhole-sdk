const circomlib = require('circomlib');
module.exports = (data) => circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0];