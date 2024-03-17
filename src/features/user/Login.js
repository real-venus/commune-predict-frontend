import React, { useState, useEffect, useCallback } from "react"
import { Link } from 'react-router-dom'
import { Button, Modal, notification, Divider, Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { ApiPromise, WsProvider } from "@polkadot/api"
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import './index.css'
import { wallets, isWalletInstalled } from "../../components/Wallet/Wallets"
import { evmWallets, isEVMWalletInstalled } from "../../components/Wallet/EVMWallets"
import Web3 from "web3"
import erc20ABi from '../../../src/ABIS/erc20.json'
//daisyUI
function Login() {

  const INITIAL_LOGIN_OBJ = {
    user: ""
  }
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)
  const [api, setApi] = useState(null);
  const [chainInfo, setChainInfo] = useState('')
  const [nodeName, setNodeName] = useState('')
  const [loadingChain, setLoadingChain] = useState(true);

  const submitForm = (e) => {
    e.preventDefault()
    setErrorMessage("")
    getAccountBalance()
    // if (loginObj.user.trim() === "") return setErrorMessage("Wallet address is required! (your account)")
    if (address.slice(0, 2) == "0x") {
      async function getBalance() {
        // setLoading(true)
        const web3 = new Web3(window.ethereum);
        const wcomai_Contract = new web3.eth.Contract(erc20ABi, "0xc78B628b060258300218740B1A7a5b3c82b3bd9f");
        const res = await wcomai_Contract.methods.balanceOf(address).call();
        const decimals = await wcomai_Contract.methods.decimals().call();
        setBalance(parseInt(res) / (10 ** parseInt(decimals)));
        if (balance < 1000) {
          window.alert(`Balance of your address:   ${balance} \n You must have a token holding of 1000 comai or more to login.`);
        }
        console.log(balance);
      }
      getBalance()
      if (balance < 1000) {
        setLoading(true)
        // Call API to check user credentials and save token in localstorage
        localStorage.setItem("token", "DumyTokenHere")
        setLoading(false)
        setTimeout(() => {
          window.location.href = '/app/welcome'
        }, 1000);
      }
    }
    if (balanceAmount > 1000) {
      setLoading(true)
      // Call API to check user credentials and save token in localstorage
      localStorage.setItem("token", "DumyTokenHere")
      setLoading(false)
      window.location.href = '/app/welcome'
    }
  }

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("")
    setAddress(value)
    setLoginObj({ ...loginObj, [updateType]: value })
  }

  const connectToSubstrate = async () => {
    setLoadingChain(false);
    const provider = new WsProvider('wss://rpc.polkadot.io');
    const substrateApi = await ApiPromise.create({ provider });
    setApi(substrateApi);
  }

  const getChainInfo = async () => {
    if (api) {
      const chain = await api.rpc.system.chain();
      setChainInfo(chain.toString())
      const nodeName = await api.rpc.system.name();
      setNodeName(nodeName.toString())
      console.log(`Connected to chain ${chain} using ${nodeName}`);
      if (api) {
        setLoadingChain(true);
      }
    }
  };

  useEffect(() => {
    getChainInfo()
  }, [api]);

  const getAccountBalance = async () => {
    try {
      const { data: { free: balance } } = await api?.query.system.account(address);
      if (parseFloat(balance) < 1000) {
        window.alert(`Balance of your address:   ${balance} \n You must have a token holding of 1000 DOT or more to login.`);
        // return;
      }
      setBalanceAmount(parseFloat(balance));

    } catch (error) {
      console.error('Error getting account balance:', error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(true);
    console.log(isOpen);
  }
  const [address1, setAddress1] = useState(null);
  const connectEVMWallet = async (key) => {

    try {
      console.log('click');
      if (key == 'SubWallet') {
        const wallet = await window.SubWallet.enable();
        setAddress(wallet[0]);
        console.log(address);
      }
      if (key == 'ethereum') {
        const wallet = await window.ethereum.enable();
        setAddress(wallet[0]);
        console.log(address);
      }


      if (address !== undefined) {
        setTimeout(() => {
          setChainInfo("Ethereum Mainnet");
        }, 500);
        setIsOpen(false);
      }

    } catch (err) {

    }
  }
  const connectWallet = async (key) => {

    try {
      console.log('click');
      const wallet = await window.injectedWeb3[key].enable();
      // setAddress(wallet.accounts.get());
      console.log("wallet.accounts.get()", wallet.accounts.get());
      if (address) {
        setTimeout(() => {
          console.log(address);
          setIsOpen(false)
        }, 500);
      }

    } catch (err) {

    }
  }

  // useEffect(() => {
  //   async function getBalance() {
  //     const web3 = new Web3(window.ethereum);
  //     const usdtContract = new web3.eth.Contract(erc20ABi, "0xc78B628b060258300218740B1A7a5b3c82b3bd9f");
  //     const res = await usdtContract.methods.balanceOf(address1[0]).call();
  //     const decimals = await usdtContract.methods.decimals().call();
  //     setBalance(parseInt(res) / (10 ** parseInt(decimals)));
  //     console.log(res);
  //   }
  //   getBalance()
  // }, [address1])

  return (
    <div className="min-h-screen bg-pic flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl opacity-90">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className=''>
            <LandingIntro />
          </div>
          <div className='py-24 px-10'>
            <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
            <button className="btn mt-[50px] w-full btn-primary" onClick={() => setIsOpen(true)}>
              Connect Wallet
            </button>
            <Modal
              title="Connect Wallet"
              style={{ top: 100, color: 'white' }}
              open={isOpen}
            >
              <div className="mt-[10px] w-full border-[1px] bg-slate-50"></div>
              <div className="mt-[20px] text-[18px] text-white">EVM Wallets</div>
              <div className="mt-[20px]">
                <div className="">
                  {
                    evmWallets.map((wallet, index) => {
                      return <div className="wallet-item flex flex-row justify-between" key={index}>

                        <div className="text-[22px] flex flex-row items-center"><img src={wallet.logo} className="w-[30px] h-[30px]"></img>{wallet.name}</div>
                        {isEVMWalletInstalled(wallet.walletKey) ? <div className="text-[16px] text-blue-400" onClick={() => { connectEVMWallet(wallet.walletKey) }}>
                          connect
                        </div> : <div className="text-[#42C59A] text-[16px]" onClick={() => {

                        }}><a href={wallet.url} target="_blink">Install</a></div>}
                      </div>
                    })
                  }
                </div>
              </div>
              <div className="mt-[20px] text-[18px] text-white">Dotsama Wallets</div>
              <div className="mt-[20px]">
                <div className="">
                  {
                    wallets.map((wallet, index) => {
                      return <div className="wallet-item flex flex-row justify-between" key={index}>
                        <div className="text-[22px] flex flex-row items-center"><img src={wallet.logo} className="w-[30px] h-[30px]"></img>{wallet.name}</div>
                        {isWalletInstalled(wallet.walletKey) ?
                          <div className="" onClick={() => { connectWallet(wallet.walletKey) }}>connect</div>
                          : <div className="text-[#42C59A] text-[16px]" onClick={() => { }}>
                            <a href={wallet.url} target="_blink">Install</a>
                          </div>
                        }
                      </div>
                    })
                  }
                </div>
              </div>
            </Modal>

            <button onClick={connectToSubstrate} className="btn mt-[50px] w-full btn-primary">{loadingChain ? <p>Connect to Substrate</p> : <p>loading&nbsp;&nbsp;&nbsp;<LoadingOutlined style={{ fontSize: 24 }} spin />
            </p>}</button>
            <form onSubmit={(e) => submitForm(e)}>

              <div className="mb-4 ">

                {
                  chainInfo ?
                    <div className="flex flex-col  justify-evenly mt-4">
                      <label className="ml-[10px] font-bold"> chainInfo &nbsp;&nbsp;:&nbsp; &nbsp; {chainInfo}</label>
                      <label className="ml-[10px] font-bold"> nodeName :&nbsp; &nbsp; {nodeName}</label>
                    </div>
                    :
                    <div className="flex flex-col  justify-evenly mt-4">
                      <label className="ml-[10px] font-bold flex flex-row">chainInfo &nbsp;&nbsp;:{!loadingChain && <div>&nbsp;&nbsp;</div>} </label>
                      <label className="ml-[10px] font-bold flex flex-row">nodeName &nbsp;&nbsp;:{!loadingChain && <div>&nbsp;&nbsp;</div>} </label>
                    </div>
                }
                <div className="w-full mt-[10px] m-auto border-5" >Connected Wallet Address</div>
                {
                  address &&
                  <div className="w-full mt-[10px] m-auto text-center border-solid border-2 border-sky-500 rounded-xl py-3" >{address}</div>
                }
              </div>
              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login