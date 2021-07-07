module.exports = Object.freeze({
    isTest: process.env.NODE_ENV !== "production",
    blockchain: {
        websocket: process.env.NODE_ENV === "production" ? "wss://api-ws.zilliqa.com" : "wss://dev-ws.zilliqa.com",
        api: process.env.NODE_ENV === "production" ? "https://ssn.zillet.io" : "https://dev-api.zilliqa.com",
        chainId: process.env.NODE_ENV === "production" ? 1 : 333,
        msgVersion: 1,
    },
    carbonToken: process.env.NODE_ENV === "production" ? "0x1720dcaef87686003f0532792450b03966543d6a" : "0x1720dcaef87686003f0532792450b03966543d6a",
    proxyContract: process.env.NODE_ENV === "production" ? "0x25c4d20f385728c4dcc7f5b7a6be4499a1b260e8" : "0x25c4d20f385728c4dcc7f5b7a6be4499a1b260e8",
    files: {
        withdrawProvUrl: "https://siasky.net/AABR0XVHg7SDyVKNk0xqHnkojFIzharCC3QtpyTLHYojDg",
        withdrawVerificationUrl: "https://siasky.net/CADe3pSNzXpMp4ZaNeyZMefnKv1fmRIsfuyP8EYOWpPLAA",
        withdrawUrl: "https://siasky.net/AABPstSjFBuv3WUNXRnk4tc9NZ1rlt8S04ta8WzbqPH_NA",
    }
});