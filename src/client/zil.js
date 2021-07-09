const Zilliqa = require("../../zilliqa");
const share = require("./share");
module.exports = ({address, privateKey}) => {
    const zilliqa = Zilliqa(privateKey);
    const contract = zilliqa.at(address);
    return Object.freeze({
        ...share({address, privateKey}),
        Deposit: async ({commit}) => zilliqa.callTransition(address, "Deposit", [
            {
                vname: 'commit',
                type: 'Uint256',
                value: `${commit}`,
            },
        ]),
    });
};