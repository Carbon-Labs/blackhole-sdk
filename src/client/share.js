const Zilliqa = require("../../zilliqa");
module.exports = ({address, privateKey}) => {
    const zilliqa = Zilliqa(privateKey);
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
                    root: data[0],
                    recipient: data[1],
                    nullifier,
                    pi_a: data[2].map(p => BigInt(p)),
                    pi_b: [(data[3].map(p => BigInt(p))), (data[4].map(p => BigInt(p))), (data[5].map(p => BigInt(p)))],
                    pi_c: data[6].map(p => BigInt(p)),
                    publicSignals: data[7].map(p => BigInt(p)),
                };
            }
            return null;
        },
        getWalletAddress: () => zilliqa.address,
    });
};