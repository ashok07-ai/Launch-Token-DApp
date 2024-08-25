import React from "react";
import { useStateContext } from "../Context";

const index = () => {
  const {DAPP} = useStateContext()
  return <div>{DAPP}</div>;
};

export default index;
