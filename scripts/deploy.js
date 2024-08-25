const hre = require("hardhat");

const tokens = (nToken) => {
  return ethers.utils.parseUnits(nToken.toString(), "ether");
}

async function main(){
  // DEPLOY TOKEN CONTRACT
  const _initialSupply = tokens(50000000);

  const StarToken = await hre.ethers.getContractFactory('StarToken');

  const starToken = await StarToken.deploy(_initialSupply);

  await starToken.deployed();

  console.log(`The address of StarToken: ${starToken.address}`)


  // TOKEN SALE CONTRACT
  const _tokenPrice = tokens(1);
  const TokenSale = await hre.ethers.getContractFactory('SaleStarToken');

  const tokenSale = await TokenSale.deploy(
    starToken.address,
    _tokenPrice
  )

  await tokenSale.deployed();

  console.log(`The address of StarTokenSale: ${tokenSale.address}`)

}

main().catch((error)=>{
  console.error(error);
  process.exitCode = 1;
})