import React, { useState } from 'react'
import { chainInfo } from './chain'

function App() {
    const [address, setAddress] = useState('')
    const [balance, setBalance] = useState('')
    const [error, setError] = useState('')

    const connectWallet = async () => {
        try {
            if (!window.keplr) {
                throw new Error("Please install Keplr extension")
            }

            await window.keplr.experimentalSuggestChain(chainInfo)
            await window.keplr.enable(chainInfo.chainId)

            const offlineSigner = window.keplr.getOfflineSigner(chainInfo.chainId)
            const accounts = await offlineSigner.getAccounts()

            setAddress(accounts[0].address)
            fetchBalance(accounts[0].address)
        } catch (err) {
            setError(err.message)
        }
    }

    const fetchBalance = async (addr) => {
        try {
            console.log("Fetching balance for:", addr);
            const response = await fetch(`${chainInfo.rest}/cosmos/bank/v1beta1/balances/${addr}`)
            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json()
            console.log("Balance data:", data);

            // Find usample balance
            const bal = data.balances?.find(b => b.denom === 'usample')
            if (bal) {
                setBalance((parseInt(bal.amount) / 1000000).toFixed(6) + ' SAMPLE')
            } else {
                setBalance('0 SAMPLE')
            }
        } catch (err) {
            console.error("Failed to fetch balance:", err)
            setError(`Failed to fetch balance: ${err.message}. Is the chain running?`)
            setBalance('Error')
        }
    }

    return (
        <div className="container">
            <h1>SampleChain Wallet</h1>
            <div className="card">
                {!address ? (
                    <div className="connect-section">
                        <p>Connect your Keplr wallet to get started</p>
                        <button onClick={connectWallet}>
                            Connect Wallet
                        </button>
                    </div>
                ) : (
                    <div className="wallet-info">
                        <div className="info-group">
                            <p>Address</p>
                            <div className="address-box">{address}</div>
                        </div>
                        <div className="info-group">
                            <p>Balance</p>
                            <div className="balance-box">{balance}</div>
                        </div>
                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )
}

export default App
