const snarkjs = require("snarkjs");
const unstringifyBigInts2 = require('snarkjs/src/stringifybigint').unstringifyBigInts;
module.exports = async (proof) => {
    proof = unstringifyBigInts2(proof);
    const verification = await fetch("https://siasky.net/CADe3pSNzXpMp4ZaNeyZMefnKv1fmRIsfuyP8EYOWpPLAA")
    const verification_key = unstringifyBigInts2(await verification.json());
    return snarkjs['groth'].isValid(verification_key, proof, proof.publicSignals);
};