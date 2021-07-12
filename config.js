module.exports = Object.freeze({
    carbonToken: process.env.NODE_ENV === "production" ? "0xbF79E16872fAd92C16810ddD2A7B9B6858C7b756" : "0x1720dcaef87686003f0532792450b03966543d6a",
    proxyContract: process.env.NODE_ENV === "production" ? "0xb2d1b251bacec821ea08883aa55d1f914255fa52" : "0xb2d1b251bacec821ea08883aa55d1f914255fa52",
    files: {
        withdrawProvUrl: "https://siasky.net/AABR0XVHg7SDyVKNk0xqHnkojFIzharCC3QtpyTLHYojDg",
        withdrawVerificationUrl: "https://siasky.net/CADe3pSNzXpMp4ZaNeyZMefnKv1fmRIsfuyP8EYOWpPLAA",
        withdrawUrl: "https://siasky.net/AABPstSjFBuv3WUNXRnk4tc9NZ1rlt8S04ta8WzbqPH_NA",
    }
});