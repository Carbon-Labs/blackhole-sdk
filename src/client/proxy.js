const Zilliqa = require("../../zilliqa");
const {proxyContract} = require("../../config");
module.exports = (privateKey) => {
    const zilliqa = Zilliqa(privateKey);

    return Object.freeze({
        DepositToken: async ({commit, token_address, contract_amount}) => zilliqa.callTransition(proxyContract, "DepositToken", [
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
        WithdrawToken: async ({token_address, contract_amount, proof, root, nullifier, recipient, treeIndex}) => zilliqa.callTransition(proxyContract, "WithdrawToken", [
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
        WithdrawZil: async ({amount, proof, root, nullifier, recipient, treeIndex}) => zilliqa.callTransition(proxyContract, "WithdrawZil", [
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
        VerifyProofToken: async ({contract_address, nullifier, verified}) => zilliqa.callTransition(proxyContract, "VerifyProofToken", [
            {
                vname: "proof",
                argtypes: ["Uint256","Bool"],
                arguments: [nullifier.toString(),
                    {
                        argtypes:[],
                        arguments:[],
                        constructor: verified ? "True" : "False"
                    }],
                constructor: "Pair"
            },
            {
                vname: 'contract_address',
                type: 'ByStr20',
                value: `${contract_address}`,
            },
        ]),
        VerifyProofZil: async ({contract_address, nullifier, verified}) => zilliqa.callTransition(proxyContract, "VerifyProofZil", [
            {
                vname: "proof",
                argtypes: ["Uint256","Bool"],
                arguments: [nullifier.toString(),
                    {
                        argtypes:[],
                        arguments:[],
                        constructor: verified ? "True" : "False"
                    }],
                constructor: "Pair"
            },
            {
                vname: 'contract_address',
                type: 'ByStr20',
                value: `${contract_address}`,
            },
        ])
    });
};