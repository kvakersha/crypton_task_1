//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IErc20  {
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address owner) external view returns (uint256 balance);
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function mint(address to, uint256 amount) external returns (bool success);
    function burn(address from, uint256 amount) external returns (bool success);
}

contract MyToken is IErc20 {
    string private NAME;
    string private SYMBOL;
    uint8 private DECIMALS;
    uint256 private TOTALSUPPLY;

    mapping(address => uint256) private BALANCEOF;
    mapping(address => mapping(address => uint256)) private APPROVALS;

    constructor(string memory _NAME, string memory _SYMBOL) {
        NAME = _NAME;
        SYMBOL = _SYMBOL;
        DECIMALS = 18;
        TOTALSUPPLY = 0;
    }

    function transfer(address to, uint256 value) external override returns (bool success) {
        unchecked {
            BALANCEOF[to] += value;
            BALANCEOF[msg.sender] -= value;            
        }

        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external override returns (bool success) {
        unchecked {
            APPROVALS[from][msg.sender] -= value;

            BALANCEOF[to] += value;
            BALANCEOF[from] -= value;
        }

        emit Transfer(from, to, value);

        return true;
    }

    function approve(address spender, uint256 value) external override returns (bool success) {
        APPROVALS[msg.sender][spender] = value;
        
        emit Approval(msg.sender, spender, value);

        return true;
    }

    function allowance(address owner, address spender) external override view returns (uint256 remaining) {
        return APPROVALS[owner][spender];
    }

    function name() external override view returns (string memory) {
        return NAME;
    }

    function symbol() external override view returns (string memory) {
        return SYMBOL;
    }

    function decimals() external override view returns (uint8){
        return DECIMALS;
    }

    function totalSupply() external override view returns (uint256) {
        return TOTALSUPPLY;
    }

    function balanceOf(address owner) external override view returns (uint256 balance) {
        return BALANCEOF[owner];
    }

     function mint(address to, uint256 amount) external override returns (bool success) {
         unchecked {
            TOTALSUPPLY += amount;
            BALANCEOF[to] += amount;
         }
        return true;
    }

    function burn(address from, uint256 amount) external override returns (bool success) {
        unchecked {
            TOTALSUPPLY -= amount;
            BALANCEOF[from] -= amount;
        }
        return true;
    }
}
