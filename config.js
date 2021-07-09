module.exports = Object.freeze({
    isTest: true,
    blockchain: {
        websocket: "wss://dev-ws.zilliqa.com",
        api: "https://dev-api.zilliqa.com",
        chainId: 333,
        msgVersion: 1,
    },
    carbonToken: process.env.NODE_ENV === "production" ? "0x1720dcaef87686003f0532792450b03966543d6a" : "0x1720dcaef87686003f0532792450b03966543d6a",
    proxyContract: process.env.NODE_ENV === "production" ? "0x93f535f5a2b5c3972c6fbb27ea93a589336a4691" : "0x93f535f5a2b5c3972c6fbb27ea93a589336a4691",
    files: {
        withdrawProvUrl: "https://siasky.net/AABR0XVHg7SDyVKNk0xqHnkojFIzharCC3QtpyTLHYojDg",
        withdrawVerificationUrl: "https://siasky.net/CADe3pSNzXpMp4ZaNeyZMefnKv1fmRIsfuyP8EYOWpPLAA",
        withdrawUrl: "https://siasky.net/AABPstSjFBuv3WUNXRnk4tc9NZ1rlt8S04ta8WzbqPH_NA",
    }
});