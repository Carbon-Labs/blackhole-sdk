const client = require("./src/client");
const MerkleTree = require("./src/lib/MerkleTree");
const MerkleProof = require("./src/business/generateMerkleProof");
const generateProof = require("./src/business/generateProof");
const createSecretNote = require("./src/business/createSecretNote");
const generateDeposit = require("./src/business/generateDeposit");
const snarkVerify = require("./src/business/snarkVerify");
const generateInput = require("./src/business/generateInput");
const parseSecret = require("./src/business/parseSecret");
const knownProof = require("./src/business/knownProof");

module.exports = ({request = fetch, privateKey, blockchain, isTest, gasLimit = 20000}) => Object.freeze({
    generateDeposit,
    createSecretNote,
    knownProof,
    MerkleTree,
    generateMerkleProof: ({contractAddress, isZRC2, commitment, nullifier, index}) =>
        isZRC2 ?
            MerkleProof(client.zrc2({address: contractAddress, privateKey, blockchain, isTest, gasLimit}))({
                commitment,
                nullifier,
                index
            }) :
            MerkleProof(client.zil({address: contractAddress, privateKey, blockchain, isTest, gasLimit}))({
                commitment,
                nullifier,
                index
            }),
    generateInput,
    snarkVerify: snarkVerify(request),
    generateProof: generateProof(request),
    parseSecret,
    client,
});