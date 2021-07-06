const snarkjs = require("snarkjs");
const crypto = require("crypto");
const bigInt = snarkjs.bigInt;
const pedersenHash = require("./pedersenHash");
const rbigint = (nbytes) => snarkjs.bigInt.leBuff2int(crypto.randomBytes(nbytes));
module.exports = ({token_address, contract_address, amount, isZRC2}) => {
    let deposit = {
        amount: bigInt(amount),
        secret: rbigint(31),
        nullifier: rbigint(31),
        token_address,
        contract_address,
        isZRC2,
    };
    const preimage = Buffer.concat([deposit.nullifier.leInt2Buff(31), deposit.secret.leInt2Buff(31)]);
    deposit.commitment = pedersenHash(preimage);
    return deposit;
};