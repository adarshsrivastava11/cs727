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
  mapping (bytes32 => address) public usernameAccountMap;

  address[] public userAccounts;

  function Voting(address[] miscAccounts) public {
    userAccounts = miscAccounts;
  }

  function addUser(address miscAddress, bytes32 userName, bytes32 userPassword) public {
    var user = userAccountMap[miscAddress];
    usernameAccountMap[userName] = miscAddress;
    // user.name = _name;
    user.username = userName;
    user.password = userPassword;
    // user. email = _email;
    userAccounts.push(miscAddress);
  }

  function isUser(bytes32 username, bytes32 userPass) view public returns (bytes32) {
    address userAddress = usernameAccountMap[username];
    var user = userAccountMap[userAddress];
    bytes32 password = user.password;
    return password;

  }
  
  function totalUsers() view public returns (address[]) {
    return userAccounts;
  }
}