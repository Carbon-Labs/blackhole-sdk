const nullifierHash = require("./nullifierHash");
module.exports = ({
                      nullifier,
                      root,
                      input,
                      relayer,
                      recipient,
                  }) =>
    root.toString() === input.publicSignals[0] &&
    nullifierHash(nullifier).toString() === input.publicSignals[1] &&
    (relayer && recipient ? (BigInt(relayer).toString() === input.publicSignals[3].toString() &&
        BigInt(recipient).toString() === input.publicSignals[2].toString()) : true)