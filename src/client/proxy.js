const Zilliqa = require("../../zilliqa");
const {proxyContract} = require("../../config");
module.exports = (privateKey) => {
    const zilliqa = Zilliqa(privateKey);
    const contract = zilliqa.at(proxyContract);
    return Object.freeze({
        proxyContract,
        DepositToken: async ({
                                 commit,
                                 token_address,
                                 contract_amount
                             }) => zilliqa.callTransition(proxyContract, "DepositToken", [
            {
                vname: 'commit',
                type: 'Uint256',
                value: `${commit}`,
            },
            {
                vname: 'token_address',
                type: 'ByStr20',
                value: `${token_address}`,
            },
            {
                vname: 'contract_amount',
                type: 'ByStr20',
                value: `${contract_amount}`,
            }
        ]),
        WithdrawToken: async ({
                                  token_address,
                                  contract_amount,
                                  proof,
                                  root,
                                  nullifier,
                                  recipient,
                                  treeIndex
                              }) => zilliqa.callTransition(proxyContract, "WithdrawToken", [
            {
                vname: 'token_address',
                type: 'ByStr20',
                value: `${token_address}`,
            },
            {
                vname: 'contract_amount',
                type: 'ByStr20',
                value: `${contract_amount}`,
            },
            {
                vname: 'root',
                type: 'Uint256',
                value: `${root}`,
            },
            {
                vname: 'nullifier',
                type: 'Uint256',
                value: `${nullifier}`,
            },
            {
                vname: 'recipient',
                type: 'ByStr20',
                value: `${recipient}`,
            },
            {
                vname: 'treeIndex',
                type: 'ByStr20',
                value: `${treeIndex}`,
            },
            {
                vname: 'pi_a',
                type: 'List Uint256',
                value: `${proof.pi_a.map(point => point.toString())}`,
            },
            {
                vname: 'pi_b_1',
                type: 'List Uint256',
                value: `${proof.pi_b[0].map(point => point.toString())}`,
            },
            {
                vname: 'pi_b_2',
                type: 'List Uint256',
                value: `${proof.pi_b[1].map(point => point.toString())}`,
            },
            {
                vname: 'pi_b_3',
                type: 'List Uint256',
                value: `${proof.pi_b[1].map(point => point.toString())}`,
            },
            {
                vname: 'pi_c',
                type: 'List Uint256',
                value: `${proof.pi_c.map(point => point.toString())}`,
            },
            {
                vname: 'publicSignals',
                type: 'List Uint256',
                value: `${proof.publicSignals.map(point => point.toString())}`,
            },
        ]),
        WithdrawZil: async ({
                                amount,
                                proof,
                                root,
                                nullifier,
                                recipient,
                                treeIndex
                            }) => zilliqa.callTransition(proxyContract, "WithdrawZil", [
            {
                vname: 'amount',
                type: 'Uint128',
                value: `${amount}`,
            },
            {
                vname: 'root',
                type: 'Uint256',
                value: `${root}`,
            },
            {
                vname: 'nullifier',
                type: 'Uint256',
                value: `${nullifier}`,
            },
            {
                vname: 'recipient',
                type: 'ByStr20',
                value: `${recipient}`,
            },
            {
                vname: 'treeIndex',
                type: 'ByStr20',
                value: `${treeIndex}`,
            },
            {
                vname: 'pi_a',
                type: 'List Uint256',
                value: `${proof.pi_a.map(point => point.toString())}`,
            },
            {
                vname: 'pi_b_1',
                type: 'List Uint256',
                value: `${proof.pi_b[0].map(point => point.toString())}`,
            },
            {
                vname: 'pi_b_2',
                type: 'List Uint256',
                value: `${proof.pi_b[1].map(point => point.toString())}`,
            },
            {
                vname: 'pi_b_3',
                type: 'List Uint256',
                value: `${proof.pi_b[1].map(point => point.toString())}`,
            },
            {
                vname: 'pi_c',
                type: 'List Uint256',
                value: `${proof.pi_c.map(point => point.toString())}`,
            },
            {
                vname: 'publicSignals',
                type: 'List Uint256',
                value: `${proof.publicSignals.map(point => point.toString())}`,
            },
        ]),
        VerifyProof: async ({
                                contract_address,
                                nullifier,
                                verified,
                                index,
                            }) => zilliqa.callTransition(proxyContract, "VerifyProofToken", [
            {
                vname: "proof",
                argtypes: ["Uint256", "Bool"],
                arguments: [nullifier.toString(),
                    {
                        argtypes: [],
                        arguments: [],
                        constructor: verified ? "True" : "False"
                    }],
                constructor: "Pair"
            },
            {
                vname: 'contract_address',
                type: 'ByStr20',
                value: `${contract_address}`,
            },
            {
                vname: 'index',
                type: 'Uint256',
                value: `${index.toString()}`,
            },
        ]),
        getToProof: async () => {
            const state = await contract.getSubState("to_withdraws");
            if (state) {
                return Object.keys(state).map(key => {
                    const pair = state[key];
                    return {
                        index: key,
                        contract_amount: pair.arguments[0],
                        nullifier: BigInt(pair.arguments[1]),
                    };
                });
            }
            return [];
        },
        getZRC2Blackhole: async (token_address) => {
            const state = await contract.getSubState("token_blackholes", [token_address.toLowerCase()]);
            if (state) {
                const all = state["token_blackholes"][token_address.toLowerCase()];
                return Object.keys(all).map(key => ({
                    contract_address: key,
                    amount: parseInt(all[key])
                }));
            }
            return [];
        },
        getZilBlackhole: async () => {
            const state = await contract.getSubState("zil_blackholes");
            if (state) {
                const all = state["zil_blackholes"];
                return Object.keys(all).map(key => ({
                    amount: parseInt(key),
                    contract_address: all[key]
                }));
            }
            return [];
        },
        getZilEmissionRate: async () => {
            const state = await contract.getSubState("zil_emission_rate");
            if (state) {
                return parseInt(state["zil_emission_rate"]);
            }
            return 0;
        },
        getZRC2EmissionRate: async (token_address) => {
            const state = await contract.getSubState("token_emission_rate", [token_address.toLowerCase()]);
            if (state) {
                return parseInt(state["token_emission_rate"][token_address.toLowerCase()]);
            }
            return 0;
        },
        getFeeRate: async () => {
            const state = await contract.getSubState("fee_rate");
            if (state) {
                return parseInt(state["fee_rate"]) / 10000;
            }
            return 0;
        }
    });
};