const buildGroth16 = require('websnark/src/groth16');
const websnarkUtils = require('websnark/src/utils');
module.exports = async (input) => {
    const responseProve = await fetch("https://siasky.net/AABR0XVHg7SDyVKNk0xqHnkojFIzharCC3QtpyTLHYojDg");
    const responseWithdraw = await fetch("https://siasky.net/AABPstSjFBuv3WUNXRnk4tc9NZ1rlt8S04ta8WzbqPH_NA");
    const circuit = await responseWithdraw.json();
    const proving_key = await responseProve.arrayBuffer();
    return websnarkUtils.genWitnessAndProve(await buildGroth16(), input, circuit, proving_key)
}