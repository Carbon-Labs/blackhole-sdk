module.exports = Object.freeze({
    isTest: true,
    blockchain: {
        websocket: "wss://dev-ws.zilliqa.com",
        api: "https://dev-api.zilliqa.com",
        chainId: 333,
        msgVersion: 1,
    },
    carbonToken: process.env.NODE_ENV === "production" ? "0x1720dcaef87686003f0532792450b03966543d6a" : "0x1720dcaef87686003f0532792450b03966543d6a",
    proxyContract: process.env.NODE_ENV === "production" ? "0x94ffe5e922a7d2481e351952d142b08b6450dbd0" : "0x94ffe5e922a7d2481e351952d142b08b6450dbd0",
    files: {
        withdrawProvUrl: "https://siasky.net/AABR0XVHg7SDyVKNk0xqHnkojFIzharCC3QtpyTLHYojDg",
        withdrawVerificationUrl: "https://siasky.net/CADe3pSNzXpMp4ZaNeyZMefnKv1fmRIsfuyP8EYOWpPLAA",
        withdrawUrl: "https://siasky.net/AABPstSjFBuv3WUNXRnk4tc9NZ1rlt8S04ta8WzbqPH_NA",
    }
});