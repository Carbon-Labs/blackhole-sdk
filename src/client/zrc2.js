const Zilliqa = require("../../zilliqa");
const {proxyContract} = require("../../config");
module.exports = ({address, privateKey}) => {
    const zilliqa = Zilliqa(privateKey);
    const contract = zilliqa.at(address);
    return Object.freeze({
        getCommitments: async (index) => {
            const state = await contract.getSubState("tree", [index.toString()]);
            if (state) {
                return state["tree"][index.toString()].map(c => BigInt(c));
            }
            return [];
        },
        isSpent: async (nullifier) => {
            const state = await contract.getSubState("nullifiers", [nullifier.toString()]);
            if (state) {
                return state["nullifiers"][nullifier.toString()].constructor === "True";
            }
            return false;
        },
        getIndex: async () => {
            const state = await contract.getSubState("index");
            if (state) {
                return parseInt(state["index"]);
            }
            return -1;
        },
        Deposit: async ({commit}) => zilliqa.callTransition(proxyContract, "Deposit", [
            {
                vname: 'commit',
                type: 'Uint256',
                value: `${commit}`,
            },
        ]),
    });
};