const wallets = [
    {
        name: 'Comwallet',
        url: 'https://comwallet.io/',
        walletKey: '',
        logo: "commune.gif",
    },
    {
        name: 'Subwallet',
        url: 'https://chromewebstore.google.com/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
        walletKey: 'subwallet-js',
        logo: "subwallet.png"
    },
    {
        name: 'Polkagate',
        url: 'https://chromewebstore.google.com/detail/polkagate-the-gateway-to/ginchbkmljhldofnbjabmeophlhdldgp',
        walletKey: 'polkagate',
        logo: "polkagate.png",
    },
    {
        name: 'Talisman',
        url: 'https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
        walletKey: 'talisman',
        logo: "Talisman.svg",
    },


]

const isWalletInstalled = (walletKey) => {
    if (window.injectedWeb3) {
        return window.injectedWeb3[walletKey] !== undefined
    }
    return false
}
export {
    wallets, isWalletInstalled
}