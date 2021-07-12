const Zilliqa = require("../../zilliqa");
const share = require("./share");
module.exports = ({address, privateKey, blockchain, isTest, gasLimit = 20000}) => {
    const zilliqa = Zilliqa({privateKey, blockchain, isTest, gasLimit, amount});
    const contract = zilliqa.at(address);
    return Object.freeze({
        ...share({address, privateKey, blockchain, isTest, gasLimit}),
        getFraction: async () => {
            const init = await contract.getInit();
            if (init) {
                const decimals = init.find(({vname}) => vname === "decimals");
                if (decimals) {
                    return 10 ** parseInt(decimals.value);
                }
            }
            return 0;
        }
    });
};