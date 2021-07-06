module.exports = (secret) => {
    const arr = secret.split("-");
    if (arr.length !== 7) {
        throw new Error("not valid note");
    }
    return {
        isZRC2: arr[1] === "zrc2",
        amount: arr[1] === "zrc2" ? undefined : parseInt(arr[3]),
        contract_address: arr[2].toLowerCase(),
        token_address: arr[1] === "zrc2" ? arr[3].toLowerCase() : undefined,
        secret: BigInt(arr[4]),
        nullifier: BigInt(arr[5]),
    };
};