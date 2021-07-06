const snarkjs = require("snarkjs");
const crypto = require('crypto');
module.exports = (nbytes) => snarkjs.bigInt.leBuff2int(crypto.randomBytes(nbytes));