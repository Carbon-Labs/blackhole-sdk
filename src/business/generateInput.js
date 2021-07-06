const stringifyBigInts = require('websnark/tools/stringifybigint').stringifyBigInts;
const pedersenHash = require("./pedersenHash");
const fee = bigInt(1000).shr(1) || bigInt(1e17);
const refund = bigInt(1000);
const rbigint = require("./generateRandomBigInt");
const getRandomRecipient = () => rbigint(20);
module.exports = ({deposit, root, pathElements, pathIndices}) => {
    const recipient = getRandomRecipient();
    const relayer = getRandomRecipient();
    return stringifyBigInts({
        root,
        nullifierHash: pedersenHash(deposit.nullifier.leInt2Buff(31)),
        nullifier: deposit.nullifier,
        secret: deposit.secret,
        pathElements,
        pathIndices,
        recipient,
        relayer,
        fee,
        refund,
    });
};