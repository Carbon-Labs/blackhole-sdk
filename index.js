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
    generateMerkleProof: ({contractAddress, isZRC2, commitment, nullifier, index}) =>
        isZRC2 ?
            MerkleProof(client.zrc2({address: contractAddress}))({
                commitment,
                nullifier,
                index
            }) :
            MerkleProof(client.zil({address: contractAddress}))({commitment, nullifier, index}),
    generateInput,
    snarkVerify,
    parseSecret,
    client,
});