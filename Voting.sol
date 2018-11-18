pragma solidity ^0.4.25;
// We have to specify what version of compiler this code will compile with
contract Voting {
  struct User {
    bytes32 name;
    bytes32 username;
    bytes32 password;
    bytes32 email;
  }

  mapping (address => User) public userAccountMap;
  mapping (bytes32 => address) public emailAccountMap;

  address[] public userAccounts;

  function Voting(address[] miscAccounts) public {
    userAccounts = miscAccounts;
  }

  function addUser(address miscAddress, bytes32 _email) public {
    var user = userAccountMap[miscAddress];
    // user.name = _name;
    // user.username = _username;
    // user.password = _password;
    user. email = _email;
    userAccounts.push(miscAddress);
  }

  function isUser(bytes32 email, bytes32 userPass) view public returns (bytes32) {
    address userAddress = emailAccountMap[email];
    var user = userAccountMap[userAddress];
    bytes32 password = user.password;
    return password;

  }
  function totalUsers() view public returns (address[]) {
    return userAccounts;
  }
}