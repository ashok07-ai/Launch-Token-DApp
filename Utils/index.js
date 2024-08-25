import { ethers } from "ethers";
import {
  SALE_TOKEN_ABI,
  SALE_TOKEN_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "../Context/constants";
import Web3Modal from 'web3Modal';


export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Please Install Metamask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Please Install Metamask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounts[0];
    window.location.reload();
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

// TOKEN_CONTRACT
const fetchTokenContract = (signerOrProvider) => {
  return new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signerOrProvider);
};

export const connectingTokenContract = async () => {
  try {
    const web3ModalInstance = new Web3Modal();
    const connection = await web3ModalInstance.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchTokenContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const getBalance = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    return await signer.getBalance();
  } catch (error) {
    console.log(error);
  }
};

// TOKEN_CONTRACT
const fetchTokenSaleContract = (signerOrProvider) => {
  new ethers.Contract(SALE_TOKEN_ADDRESS, SALE_TOKEN_ABI, signerOrProvider);
};

export const connectingTokenSaleContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchTokenSaleContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
