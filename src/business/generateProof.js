const buildGroth16 = require('src/lib/websnark/src/groth16');
const websnarkUtils = require('src/lib/websnark/src/utils');
const {files: {withdrawProvUrl, withdrawUrl}} = require("../../config");
module.exports = (request = fetch) => async (input) => {
    const responseProve = await request(withdrawProvUrl);
    const responseWithdraw = await request(withdrawUrl);
    const circuit = await responseWithdraw.json();
    const proving_key = await responseProve.arrayBuffer();
    return websnarkUtils.genWitnessAndProve(await buildGroth16(), input, circuit, proving_key);
}