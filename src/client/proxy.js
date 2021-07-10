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
                                  node,
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
                vname: 'pi_a',
                type: 'List Uint256',
                value: proof.pi_a.map(point => point.toString()),
            },
            {
                vname: 'pi_b_1',
                type: 'List Uint256',
                value: proof.pi_b[0].map(point => point.toString()),
            },
            {
                vname: 'pi_b_2',
                type: 'List Uint256',
                value: proof.pi_b[1].map(point => point.toString()),
            },
            {
                vname: 'pi_b_3',
                type: 'List Uint256',
                value: proof.pi_b[1].map(point => point.toString()),
            },
            {
                vname: 'pi_c',
                type: 'List Uint256',
                value: proof.pi_c.map(point => point.toString()),
            },
            {
                vname: 'publicSignals',
                type: 'List Uint256',
                value: proof.publicSignals.map(point => point.toString()),
            },
            {
                vname: 'node',
                type: 'ByStr20',
                value: `${node}`,
            },
            {
                vname: 'treeIndex',
                type: 'Uint256',
                value: `${treeIndex}`,
            },
        ]),
        WithdrawZil: async ({
                                amount,
                                proof,
                                root,
                                nullifier,
                                recipient,
                                node,
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
                vname: 'pi_a',
                type: 'List Uint256',
                value: proof.pi_a.map(point => point.toString()),
            },
            {
                vname: 'pi_b_1',
                type: 'List Uint256',
                value: proof.pi_b[0].map(point => point.toString()),
            },
            {
                vname: 'pi_b_2',
                type: 'List Uint256',
                value: proof.pi_b[1].map(point => point.toString()),
            },
            {
                vname: 'pi_b_3',
                type: 'List Uint256',
                value: proof.pi_b[2].map(point => point.toString()),
            },
            {
                vname: 'pi_c',
                type: 'List Uint256',
                value: proof.pi_c.map(point => point.toString()),
            },
            {
                vname: 'publicSignals',
                type: 'List Uint256',
                value: proof.publicSignals.map(point => point.toString()),
            },
            {
                vname: 'node',
                type: 'ByStr20',
                value: `${node}`,
            },
            {
                vname: 'treeIndex',
                type: 'Uint256',
                value: `${treeIndex}`,
            },
        ]),
        VerifyProof: async ({
                                contract_address,
                                nullifier,
                                verified,
                                index,
                            }) => zilliqa.callTransition(proxyContract, "VerifyProof", [
            {
                vname: "proof",
                type: "Pair Uint256 Bool",
                value: {
                    argtypes: ["Uint256", "Bool"],
                    arguments: [nullifier.toString(),
                        {
                            argtypes: [],
                            arguments: [],
                            constructor: verified ? "True" : "False"
                        }],
                    constructor: "Pair"
                }
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
        getToProof: async (verifier) => {
            const state = await contract.getSubState("to_withdraws");
            if (state) {
                const to_withdraws = state["to_withdraws"];
                return Object.keys(to_withdraws).filter(key => to_withdraws[key].arguments[0].toLowerCase() === verifier.toLowerCase()).map(key => {
                    const pair = to_withdraws[key];
                    return {
                        index: key,
                        verifer: pair.arguments[0],
                        contract_amount: pair.arguments[1],
                        nullifier: BigInt(pair.arguments[2]),
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
        },
        getTokenInfo: async ({isZRC2, token_address, contract_address}) => {
            const variableName = isZRC2 ? "token_emission_rate" : "zil_emission_rate";
            let amount = 0;
            if (isZRC2) {
                const tokenAmountContract = zilliqa.at(contract_address);
                const init = await tokenAmountContract.getInit();
                if (init) {
                    const amountContract = init.find(({vname}) => vname === "contract_amount");
                    if (amountContract) {
                        amount = parseInt(amountContract.value);
                    }
                }
            }
            const stateEmissionRate = await contract.getSubState(variableName, token_address ? [token_address.toString()] : undefined);
            const stateFee = await contract.getSubState("fee_rate");
            const statePrice = await contract.getSubState("deposit_carb_price");
            const res = {
                emissionRate: 0,
                fee: 0,
                price: 0,
                amount
            };
            if (stateEmissionRate) {
                const o = stateEmissionRate[variableName];
                res.emissionRate = isZRC2 ? parseInt(o[token_address.toString()]) : parseInt(o);
            }
            if (stateFee) {
                res.fee = parseInt(stateFee["fee_rate"]);
            }
            if (statePrice) {
                res.price = parseInt(statePrice["deposit_carb_price"]);
            }
            return res;
        },
        getVerifiers: async () => {
            const state = await contract.getSubState("verifiers");
            if (state && state["verifiers"]) {
                const data = state["verifiers"];
                return Object.keys(data).map(key => key);
            }
            return []
        }
    });
};