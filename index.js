const client = require("./src/client");
const MerkleProof = require("./src/business/generateMerkleProof");
const createSecretNote = require("./src/business/createSecretNote");
const generateDeposit = require("./src/business/generateDeposit");
const snarkVerify = require("./src/business/snarkVerify");
const generateInput = require("./src/business/generateInput");
const parseSecret = require("./src/business/parseSecret");

module.exports = () => Object.freeze({
    generateDeposit,
    createSecretNote,
    generateMerkleProof: ({contractAddress, isZRC2, commitment, nullifier}) =>
        isZRC2 ?
            MerkleProof(client.zrc2({address: contractAddress}))({
                commitment,
                nullifier
            }) :
            MerkleProof(client.zil({address: contractAddress}))({commitment, nullifier}),
    generateInput,
    snarkVerify,
    parseSecret,
    client,
});