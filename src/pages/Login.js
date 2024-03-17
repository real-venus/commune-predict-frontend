import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Login from '../features/user/Login'
import { wallets, isWalletInstalled } from "../components/Wallet/Wallets"
import { Button } from 'antd'
import Web3 from 'web3'
import axios from 'axios'
import erc20ABi from '../../src/ABIS/erc20.json'


function ExternalPage() {


    const [address, setAddress] = useState(null);
    const connectWallet = async (key) => {

        try {
            // const wallet = await window.injectedWeb3[key].enable();
            const wallet = await window.SubWallet.enable();
            setAddress(wallet);

        } catch (err) {

        }
    }
    useEffect(() => {
        async function getBalance() {
            const web3 = new Web3(window.SubWallet);
            const usdtContract = new web3.eth.Contract(erc20ABi, "0xc78B628b060258300218740B1A7a5b3c82b3bd9f");
            
            const res = await usdtContract.methods.balanceOf("0xc78B628b060258300218740B1A7a5b3c82b3bd9f").call();
            const decimals = await usdtContract.methods.decimals().call()
            // console.log(res, decimals)
        }
        getBalance()
        // console.log(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdac17f958d2ee523a2206206994597c13d831ec7&address=${address}&tag=latest&apikey=YBVGKCWWHAZJJN75CVJBRBMAN1TV5P8VF3`)
        // if (address)
        //     axios.get(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdac17f958d2ee523a2206206994597c13d831ec7&address=${address}&tag=latest&apikey=YBVGKCWWHAZJJN75CVJBRBMAN1TV5P8VF3`).then((res) => {
        //         console.log(res.data)
        //     })
    }, [address])
    return (
        <div className="">
            {/* <Button>Connect Wallet</Button>
            <div style={{
                position: "fixed",
                zInex: 1,
                backgroundColor: "black",
                opacity: 0.3,
                width: "100vw",
                height: "100vh",

            }}>

                <div style={{
                    width: "400px",
                    padding: "10px",
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    backgroundColor: "black",
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column"
                }}>
                    {
                        wallets.map((wallet, index) => {
                            return <div key={index}>
                                <div>{wallet.name}</div>
                                {isWalletInstalled(wallet.walletKey) ? <Button onClick={() => { connectWallet(wallet.walletKey) }}>Connect wallet</Button> : <Button onClick={() => {

                                }}>Install wallet</Button>}


                            </div>
                        })
                    }
                    <div style={{ color: "white" }}>{address}</div>
                </div>
            </div> */}

            <Login />
        </div>
    )
}

export default ExternalPage