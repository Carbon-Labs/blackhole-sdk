const nullifierHash = require("./nullifierHash");
module.exports = ({
                      nullifier,
                      root,
                      input
                  }) => root.toString() === input.publicSignals[0] && nullifierHash(nullifier).toString() === input.publicSignals[1];