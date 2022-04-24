//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./IErc20.sol";

contract MyToken is IErc20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals = 18;
    uint256 private _totalSupply;

    mapping(address => uint256) private _balanceOf;
    mapping(address => mapping(address => uint256)) private _approvals;

    constructor(string memory nameVal, string memory symbolVal) {
        _name = nameVal;
        _symbol = symbolVal;
    }

    function transfer(address to, uint256 value) external override returns (bool success) {
        require(_balanceOf[msg.sender] >= value, "Your balance is not enough");
        _balanceOf[to] += value;
        _balanceOf[msg.sender] -= value;            

        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external override returns (bool success) {
        require(_balanceOf[from] >= value, "Your balance is not enough");
        require(_approvals[from][msg.sender] >= value, "Not approved");

        _approvals[from][msg.sender] -= value;

        _balanceOf[to] += value;
        _balanceOf[from] -= value;

        emit Transfer(from, to, value);

        return true;
    }

    function approve(address spender, uint256 value) external override returns (bool success) {
        _approvals[msg.sender][spender] = value;
        
        emit Approval(msg.sender, spender, value);

        return true;
    }

    function allowance(address owner, address spender) external override view returns (uint256 remaining) {
        return _approvals[owner][spender];
    }

    function name() external override view returns (string memory) {
        return _name;
    }

    function symbol() external override view returns (string memory) {
        return _symbol;
    }

    function decimals() external override view returns (uint8){
        return _decimals;
    }

    function totalSupply() external override view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address owner) external override view returns (uint256 balance) {
        return _balanceOf[owner];
    }

     function mint(address to, uint256 amount) external override returns (bool success) {
        _totalSupply += amount;
        _balanceOf[to] += amount;
        return true;
    }

    function burn(address from, uint256 amount) external override returns (bool success) {
        _totalSupply -= amount;
        _balanceOf[from] -= amount;
        return true;
    }
}
