import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

// INTERNAL IMPORT
import {
  CheckIfWalletConnected,
  connectWallet,
  connectingTokenContract,
  getBalance,
  connectingTokenSaleContract,
} from "../Utils/index";


const StateContext = createContext();

export const StateContextProvider = ({ children}) =>  {
  const DAPP = 'Launch Token'
  return <StateContext.Provider value={{DAPP}}>{children}</StateContext.Provider>
}

export const useStateContext = () => useContext(StateContext);