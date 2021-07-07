const pedersenHash = require("./pedersenHash");
module.exports = (nullifier) => pedersenHash(nullifier.leInt2Buff(31))