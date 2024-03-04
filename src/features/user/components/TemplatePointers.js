function TemplatePointers() {
    return (
        <>
            <h1 className="text-2xl mt-8 font-bold text-white">Do you have a crypto wallet accout?</h1>
            <p className="text-center mt-[5px] text-white">If you don't have, please install wallet </p>
            <div className='mt-[20px] flex w-full items-center justify-evenly cursor-pointer'>
                <a href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank" >
                    <div className='flex items-center justify-center hover:bg-gray-900 p-2 w-[105.77px] h-[105.77px] rounded-md' style={{ flexDirection: 'column', border: '1px solid gray' }} >
                        <img src="./metamask.svg" alt='login with Metamask' width={50} height={50} className='cursor-pointer mb-1' />
                        <p className="text-white">MetaMask</p>
                    </div>
                </a>
                <a href="https://chromewebstore.google.com/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa" target="_blank">
                    <div className='flex items-center justify-center hover:bg-gray-900 p-2 w-[105.77px] h-[105.77px] rounded-md' style={{ flexDirection: 'column', border: '1px solid gray' }} >
                        <img src="./phantom.png" alt='login with Phantom' width={50} height={50} className='cursor-pointer mb-1' />
                        <p className="text-white">Phantom</p>
                    </div>
                </a>
                <a href="https://chromewebstore.google.com/detail/subwallet-polkadot-wallet/onhogfjeacnfoofkfgppdlbmlmnplgbn" target="_blank">
                    <div className='flex flex-col items-center justify-center hover:bg-gray-900 p-2 w-[105.77px] h-[105.77px] rounded-md' style={{ flexDirection: 'column', border: '1px solid gray' }} >
                        <img src="./subwallet.png" alt='login with Polkadot' width={30} height={30} className='cursor-pointer mb-1' />
                        <p className="text-white" >Polkadot</p>
                    </div>
                </a>
            </div>
        </>
    )
}

export default TemplatePointers