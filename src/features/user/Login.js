import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Button, Flex, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { ApiPromise, WsProvider } from "@polkadot/api"
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
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
        if (loginObj.user.trim() === "") return setErrorMessage("Wallet address is required! (your account)")
        else if(balanceAmount < 1000 ){
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
          if(api){
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
          if(parseFloat(balance) < 1000 ){
            window.alert(`Balance of your address:   ${balance} \n You must have a token holding of 1000 DOT or more to login.`);
            // return;
          }
          setBalanceAmount(parseFloat(balance));
    
        } catch (error) {
          console.error('Error getting account balance:', error);
        }
      };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <button onClick={connectToSubstrate} className="btn mt-[50px] w-full btn-primary">{loadingChain ? <p>Connect to Substrate</p> : <p>loading&nbsp;&nbsp;&nbsp;<LoadingOutlined style={{ fontSize: 24 }} spin />
                                    </p> }</button>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4 ">
                                
                                {
                                    chainInfo && nodeName ?
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

                                <InputText type="text" defaultValue={""} updateType="user" containerStyle="mt-4" labelTitle="Enter Substrate Address" updateFormValue={updateFormValue} />
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