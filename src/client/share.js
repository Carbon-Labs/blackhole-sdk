const Zilliqa = require("../../zilliqa");
module.exports = ({address, privateKey, blockchain, isTest, gasLimit = 20000, amount = 0}) => {
    const zilliqa = Zilliqa({privateKey, blockchain, isTest, gasLimit, amount});
    const contract = zilliqa.at(address);
    return Object.freeze({
        getCommitments: async (index) => {
            const state = await contract.getSubState("tree", [index.toString()]);
            if (state) {
                return state["tree"][index.toString()].map(c => BigInt(c)).reverse();
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
        isExist: async (nullifier) => {
            const state = await contract.getSubState("nullifiers", [nullifier.toString()]);
            if (state) {
                return !!state["nullifiers"][nullifier.toString()].constructor;
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
        getWithdraw: async (nullifier) => {
            const state = await contract.getSubState("withdraw", [nullifier.toString()]);
            if (state) {
                const data = state["withdraw"][nullifier.toString()].arguments;
                if (!data.length) {
                    return null
                }
                return {
                    recipient: data[0],
                    nullifier,
                    pi_a: data[1].map(p => BigInt(p)),
                    pi_b: [(data[2].map(p => BigInt(p))), (data[3].map(p => BigInt(p))), (data[4].map(p => BigInt(p)))],
                    pi_c: data[5].map(p => BigInt(p)),
                    publicSignals: data[6].map(p => BigInt(p)),
                };
            }
            return null;
        },
        getWalletAddress: () => zilliqa.address,
    });
};