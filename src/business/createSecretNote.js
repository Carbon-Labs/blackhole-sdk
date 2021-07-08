module.exports = (deposit) =>
    deposit.isZRC2 ?
        `blackHole#zrc2#${deposit.contract_address}#${deposit.token_address}#${deposit.secret}#${deposit.nullifier}#${deposit.index}#${deposit.commitment}` :
        `blackHole#zil#${deposit.contract_address}#${deposit.amount}#${deposit.secret}#${deposit.nullifier}#${deposit.index}#${deposit.commitment}`;