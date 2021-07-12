const stringifyBigInts = require('../lib/websnark/tools/stringifybigint').stringifyBigInts;
const nullifierHash = require("./nullifierHash");
module.exports = ({nullifier, secret, root, pathElements, pathIndices, relayer, recipient, fee, refund}) => {
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