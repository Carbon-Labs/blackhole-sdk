const snarkjs = require("snarkjs");
const unstringifyBigInts2 = require('snarkjs/src/stringifybigint').unstringifyBigInts;
const {files: {withdrawVerificationUrl}} = require("../../config");
module.exports = (request = fetch) => async (proof) => {
    proof = unstringifyBigInts2(proof);
    const verification = await request(withdrawVerificationUrl)
    const verification_key = unstringifyBigInts2(await verification.json());
    return snarkjs['groth'].isValid(verification_key, proof, proof.publicSignals);
};