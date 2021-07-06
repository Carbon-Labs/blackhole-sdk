module.exports = (deposit) =>
    deposit.isZRC2 ?
        `BlackHole#zrc2#${deposit.contract_address}#${deposit.token_address}#${deposit.secret}#${deposit.nullifier}#${deposit.index}` :
        `BlackHole#zil#${deposit.contract_address}#${deposit.amount}#${deposit.secret}#${deposit.nullifier}#${deposit.index}`;