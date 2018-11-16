pragma solidity ^0.4.18;
contract UserManagement {

  struct User {
    bytes32 name;
    bytes32 username;
    bytes32 password;
    bytes32 email;
  }

  mapping (address => User) public userAccountMap;
  address[] public userAccounts;

  function UserManagement() public {
  }

  function addCandidate(bytes32 _name, bytes32 _username, bytes32 _password, bytes32 _email, address accountAddress) public returns (address) {
    var user = userAccountMap[accountAddress];
    user.name = _name;
    user.username = _username;
    user.password = _password;
    user. email = _email;
    userAccounts.push(accountAddress);
    return accountAddress;
  }

  function getUsers() public returns(address[]) {
    return userAccounts;
  }
    
  function getUser(address _address) public returns (bytes32, bytes32, bytes32) {
    return (userAccountMap[_address].name, userAccountMap[_address].username, userAccountMap[_address].email);
  }
    
  function countUsers() public returns (uint256) {
    return userAccounts.length;
  }

  // // This function returns the total votes a candidate has received so far
  // function totalVotesFor(bytes32 candidate) view public returns (uint8) {
  //   require(validCandidate(candidate));
  //   return votesReceived[candidate];
  // }
  // function totalCandidates() view public returns (bytes32[]) {
  //   return candidateList;
  // }
  // // This function increments the vote count for the specified candidate. This
  // // is equivalent to casting a vote
  // function voteForCandidate(bytes32 candidate) public {
  //   require(validCandidate(candidate));
  //   votesReceived[candidate] += 1;
  // }
  // function validCandidate(bytes32 candidate) view public returns (bool) {
  //   for(uint i = 0; i < candidateList.length; i++) {
  //     if (candidateList[i] == candidate) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
}