import React from "react";
import { useStateContext } from "../Context";
import {
  About,
  Banner,
  Contact,
  Distribution,
  Faq,
  Footer,
  Header,
  MobileApp,
  Service,
  Team,
  TokenSale,
} from "../Components";

const index = () => {
  const {
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
  } = useStateContext();
  return (
    <div>
      <div className="v_dark">
        <Header
          address={address}
          setAddress={setAddress}
          connectWallet={connectWallet}
        />
        <Banner trasnferNativeToken={trasnferNativeToken} />
        <Service />
        <About />
        <TokenSale buyToken={buyToken} tokenSale={tokenSale} />
        <Distribution />
        <MobileApp />
        <Team />
        <Faq />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default index;
