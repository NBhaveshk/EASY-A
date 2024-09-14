// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenDistribution {
    address public admin;
    ERC20 public token;

    constructor(address _tokenAddress) {
        admin = msg.sender;
        token = ERC20(_tokenAddress);
    }

    function distributeTokens(address recipient, uint256 amount) external {
        require(msg.sender == admin, "Only admin can distribute tokens");
        require(token.balanceOf(address(this)) >= amount, "Insufficient tokens in contract");
        token.transfer(recipient, amount);
    }
}
