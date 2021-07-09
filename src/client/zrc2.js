const Zilliqa = require("../../zilliqa");
const share = require("./share");
module.exports = ({address, privateKey}) => {
    const zilliqa = Zilliqa(privateKey);
    const contract = zilliqa.at(address);
    return Object.freeze({
        ...share({address, privateKey}),
    });
};