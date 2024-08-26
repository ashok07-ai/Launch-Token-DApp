import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

// INTERNAL IMPORT
import {
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
    try {
      // GET USER ACCOUNT
      const account = await checkIfWalletConnected();
      setAddress(account);

      // GET USER BALANCE
      const balance = await getBalance();
      setBalance(ethers.utils.formatEther(balance.toString()));

      // TOKEN CONTRACT
      const TOKEN_CONTRACT = await connectingTokenContract();
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
        tokenHolders: tokenHolders.toNumber(),
      };
      setNativeToken(nativeToken);

      // GETTING TOKEN HOLDERS DATA
      const getTokenHolder = await TOKEN_CONTRACT.getTokenHolder();
      setTokenHolders(getTokenHolder);

      if (account) {
        const getTokenHolderData = await TOKEN_CONTRACT.getTokenHolderData(
          account
        );

        const currentHolder = {
          tokenId: getTokenHolderData[0].toNumber(),
          from: getTokenHolderData[1],
          to: getTokenHolderData[2],
          totalToken: ethers.utils.formatEther(
            getTokenHolderData[3].toString()
          ),
          tokenHolder: getTokenHolderData[4],
        };
        setCurrentHolder(currentHolder);
      }

      // TOKEN SALE CONTRACT
      const TOKEN_SALE_CONTRACT = await connectingTokenSaleContract();
      const tokenPrice = await TOKEN_SALE_CONTRACT.tokenPrice();
      const tokenSold = await TOKEN_SALE_CONTRACT.totalTokenSold();
      const tokenSaleBalance = await TOKEN_CONTRACT.balanceOf(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
      );

      const tokenSale = {
        tokenPrice: ethers.utils.formatEther(tokenPrice.toString()),
        tokenSold: tokenSold.toNumber(),
        tokenSaleBalance: ethers.utils.formatEther(tokenSaleBalance.toString()),
      };

      setTokenSale(tokenSale);
      console.log(tokenSale, "tokenSale");
      console.log(currentHolder, "currenctholder");
      console.log(nativeToken, "native token");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // BUY TOKEN
  const buyToken = async (nToken) => {
    try {
      const amount = ethers.utils.parseUnits(nToken.toString(), "ether");
      const contract = await connectingTokenSaleContract();

      const buying = await contract.buyToken(nToken, {
        value: amount.toString(),
      });

      await buying.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // TRANSFER NATIVE TOKEN
  const trasnferNativeToken = async () => {
    try {
      const TOKEN_SALE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      const TOKEN_AMOUNT = 500;
      const tokens = TOKEN_AMOUNT.toString();
      const transferAmount = ethers.utils.parseEther(tokens);

      const contract = await connectingTokenContract();
      const transaction = await contract.transfer(
        TOKEN_SALE_ADDRESS,
        transferAmount
      );
      await transaction.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        trasnferNativeToken,
        buyToken,
        connectWallet,
        setAddress,
        DAPP,
        currentHolder,
        tokenSale,
        tokenHolders,
        nativeToken,
        balance,
        address,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
