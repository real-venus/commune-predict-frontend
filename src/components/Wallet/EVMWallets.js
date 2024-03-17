const evmWallets = [
    {
        name: 'Subwallet (EVM)',
        url: 'https://chrome.google.com/webstore/detail/subwallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
        walletKey: 'SubWallet',
        logo: "subwallet.png"
    },
    {
        name: 'MetaMask',
        url: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
        walletKey: 'ethereum',
        logo: "metamask.svg",
    }

]

const isEVMWalletInstalled = (walletKey) => {
    if (walletKey == 'ethereum') {
        return window.ethereum !== undefined
    }
    if (walletKey == 'SubWallet') {
        return window.SubWallet !== undefined
    }
    return false
}
export {
    evmWallets, isEVMWalletInstalled
}