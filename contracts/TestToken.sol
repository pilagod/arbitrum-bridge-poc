// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    address private owner;

    constructor() ERC20("TestToken", "TKN") {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "not owner");
        _;
    }

    function mint(address _to, uint256 _amount)
        public
        onlyOwner
        returns (bool)
    {
        _mint(_to, _amount);
        return true;
    }
}
