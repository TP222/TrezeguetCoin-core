// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TrezeguetCoin is ERC20, Ownable {
    uint256 public circulatingSupply;
    uint256 public constant MAX_SUPPLY = 100000000 * 10**18;
    uint256 public constant MINT_AMOUNT = 10000000 * 10**18;

    mapping(address => bool) public whitelist;
    mapping(address => bool) public hasMinted;

    constructor() ERC20("TrezeguetCoin", "TREZEG") {}

    function addToWhitelist(address _inputAddress) public onlyOwner {
        whitelist[_inputAddress] = true;
    }

    function mint() public {
        require(whitelist[msg.sender] == true);
        require(hasMinted[msg.sender] == false);
        require(circulatingSupply + MINT_AMOUNT <= MAX_SUPPLY);
        _mint(msg.sender, MINT_AMOUNT);
        circulatingSupply += MINT_AMOUNT;
        hasMinted[msg.sender] = true;
    }
}
