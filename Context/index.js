import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

// INTERNAL IMPORT
import {
  CheckIfWalletConnected,
  connectWallet,
  connectingTokenContract,
  getBalance,
  connectingTokenSaleContract,
  checkIfWalletConnected,
} from "../Utils/index";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const DAPP = "Launch Token";
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [nativeToken, setNativeToken] = useState("");
  const [tokenHolders, setTokenHolders] = useState([]);
  const [tokenSale, setTokenSale] = useState("");
  const [currentHolder, setCurrentHolder] = useState("");

  const fetchInitialData = async () => {
    console.log("hello");
    try {
      // GET USER ACCOUNT
      const account = await checkIfWalletConnected();
      setAddress(account);

      // GET USER BALANCE
      const balance = await getBalance();
      setBalance(ethers.utils.formatEther(balance.toString()));

      // TOKEN CONTRACT
      const TOKEN_CONTRACT = await connectingTokenContract();
      console.log(TOKEN_CONTRACT)
      let tokenBalance;
      if (account) {
        tokenBalance = await TOKEN_CONTRACT.balanceOf(account);
      } else {
        tokenBalance = 0;
      }

      // GET ALL TOKEN DATA
      const tokenName = await TOKEN_CONTRACT.tokenName();
      const tokenSymbol = await TOKEN_CONTRACT.tokenSymbol();
      const tokenStandard = await TOKEN_CONTRACT.standard();
      const tokenTotalSupply = await TOKEN_CONTRACT.totalSupply();
      const tokenOwnerofContract = await TOKEN_CONTRACT.ownerOfContract();
      const tokenHolders = await TOKEN_CONTRACT._userId();
      const tokenAddress = await TOKEN_CONTRACT.address;

      const nativeToken = {
        tokenAddress: tokenAddress,
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        tokenStandard: tokenStandard,
        tokenOwnerofContract: tokenOwnerofContract,
        tokenTotalSupply: ethers.utils.formatEther(tokenTotalSupply.toString()),
        tokenBalance: ethers.utils.formatEther(tokenBalance.toString()),
        tokenHolders: tokenHolders.toNumber()
      }

      setNativeToken(nativeToken)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <StateContext.Provider value={{ DAPP }}>{children}</StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
