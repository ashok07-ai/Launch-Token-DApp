// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { StarToken } from "./StarToken.sol";

contract SaleStarToken {
  address admin;
  StarToken public starTokenContract;
  uint256 public tokenPrice;
  uint256 public totalTokenSold;

  event Sell(address _buyer, uint256 _amount);

  constructor(StarToken _starTokenContract, uint256 _tokenPrice){
    admin = msg.sender;
    starTokenContract = _starTokenContract;
    tokenPrice = _tokenPrice;
  }

  function multiply(uint256 x, uint256 y) internal pure returns(uint256 z){
    require(y == 0 || (z = x * y) / y == x);
  }

  function buyToken(uint256 _numberOfTokens) public payable {
    require(msg.value == multiply(_numberOfTokens, tokenPrice));
    require(starTokenContract.balanceOf(address(this)) >= _numberOfTokens);
    require(starTokenContract.transfer(msg.sender, _numberOfTokens * 1000000000000000000));
    totalTokenSold += _numberOfTokens;
    emit Sell(msg.sender, _numberOfTokens);
  }

  function endSale() public {
    require(msg.sender == admin);
    require(starTokenContract.transfer(admin, starTokenContract.balanceOf(address(this))));

    payable(admin).transfer(address(this).balance);
  }

}