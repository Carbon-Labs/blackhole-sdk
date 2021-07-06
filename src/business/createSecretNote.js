module.exports = (deposit) =>
    deposit.isZRC2 ?
        `blackhole-zrc2-${deposit.contract_address}-${deposit.token_address}-${deposit.secret}-${deposit.nullifier}` :
        `blackhole-zil-${deposit.contract_address}-${deposit.amount}-${deposit.secret}-${deposit.nullifier}`;