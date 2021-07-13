const Zilliqa = require("../../zilliqa");
const share = require("./share");
module.exports = ({address, privateKey, blockchain, isTest, gasLimit = 20000}) => {
    const zilliqa = Zilliqa({privateKey, blockchain, isTest, gasLimit});
    return Object.freeze({
        ...share({address, privateKey, blockchain, isTest, gasLimit}),
        Deposit: async ({commit, amount}) => zilliqa.callTransition(address, "Deposit", [
            {
                vname: 'commit',
                type: 'Uint256',
                value: `${commit}`,
            },
        ], amount),
    });
};