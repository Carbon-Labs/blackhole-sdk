const stringifyBigInts = require('../lib/websnark/tools/stringifybigint').stringifyBigInts;
const nullifierHash = require("./nullifierHash");
const snarkjs = require("snarkjs");
const bigInt = snarkjs.bigInt;
const fee = bigInt(1000).shr(1) || bigInt(1e17);
const refund = bigInt(1000);
const rbigint = require("./generateRandomBigInt");
const getRandomRecipient = () => rbigint(20);
module.exports = ({nullifier, secret, root, pathElements, pathIndices}) => {
    const recipient = getRandomRecipient();
    const relayer = getRandomRecipient();
    return stringifyBigInts({
        root,
        nullifierHash: nullifierHash(nullifier),
        nullifier: nullifier,
        secret: secret,
        pathElements,
        pathIndices,
        recipient,
        relayer,
        fee,
        refund,
    });
};