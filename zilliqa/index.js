const {BN, Long, bytes, units} = require('@zilliqa-js/util');
const {Zilliqa} = require('@zilliqa-js/zilliqa');
const {getAddressFromPrivateKey} = require('@zilliqa-js/crypto');

module.exports = ({privateKey, blockchain, isTest, gasLimit = 20000}) => {
    const zilliqa = new Zilliqa(blockchain.api);
    const VERSION = bytes.pack(blockchain.chainId, blockchain.msgVersion);
    if (privateKey)
        zilliqa.wallet.addByPrivateKey(privateKey);
    const address = privateKey ? getAddressFromPrivateKey(privateKey) : null;


    const deployContract = async (name, code, init) => {
        const myGasPrice = units.toQa('2500', units.Units.Li);

        console.log(`Deploying a new contract of ${name} ....`);
        const contract = zilliqa.contracts.new(code, init);

        const [deployTx, deployedContract] = await contract.deployWithoutConfirm(
            {
                version: VERSION,
                gasPrice: myGasPrice,
                gasLimit: Long.fromNumber(gasLimit),
            },
            isTest,
        );

        if (!deployTx || !deployTx.id) {
            return null;
        }

        console.log(`Tx: 0x${deployTx.id}`);

        const confirmedTxn = await deployTx.confirm(deployTx.id);

        if (confirmedTxn.receipt.success === true) {
            console.log(`Contract address of ${name} is: 0x${deployedContract.address}`);
        } else {
            console.log("Error");
            console.log(confirmedTxn);
            throw new Error("Error Deploy contract " + name);
        }

        return "0x" + deployedContract.address;
    };

    const callTransition = async (address, tag, params, amount = 0, nonce, callback) => {
        const deployedContract = zilliqa.contracts.at(address);
        const myGasPrice = units.toQa('2500', units.Units.Li);
        const callTx = await deployedContract.callWithoutConfirm(tag, params,
            {
                // amount, gasPrice and gasLimit must be explicitly provided
                version: VERSION,
                amount: new BN(amount),
                gasPrice: myGasPrice,
                gasLimit: Long.fromNumber(gasLimit),
                nonce
            },
            isTest,
        );
        if (!callTx.id) {
            throw new Error("no transaction id found");
        }
        console.log("callback type", callback ? typeof callback : "");
        if (callback && (typeof callback === "function")) {
            await callback(callTx.id);
        }
        console.log(`The transaction id is: 0x${callTx.id}`);
        console.log(`Waiting transaction be confirmed....`);
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (confirmedTxn.receipt.success === true) {
            console.log(`${tag} Done!`);
            return callTx.id;
        }
        throw new Error("transition call error tx: " + '0x' + callTx.id);
    }

    return Object.freeze({
        deployContract,
        callTransition,
        address,
        at: (contractAddress) => zilliqa.contracts.at(contractAddress),
    });
};