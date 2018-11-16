web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[],"name":"getUsers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userAccounts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"getUser","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userAccountMap","outputs":[{"name":"name","type":"bytes32"},{"name":"username","type":"bytes32"},{"name":"password","type":"bytes32"},{"name":"email","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_username","type":"bytes32"},{"name":"_password","type":"bytes32"},{"name":"_email","type":"bytes32"},{"name":"accountAddress","type":"address"}],"name":"addCandidate","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"countUsers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x2299828472dc2c8a2b877a7c9e0ef47e3b546c1c');
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3", "Addy": "candidate-4"}

// function voteForCandidate(candidate) {
//   candidateName = $("#candidate").val();
//   try {
//     contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
//       let div_id = candidates[candidateName];
//       $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
//     });
//   } catch (err) {
//   }
// }

// function addCandidate(candidate) {
//   candidateName = $("#candidate_name").val();
//   try {
//     contractInstance.addCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
//       let div_id = candidates[candidateName];
//       $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
//     });
//   } catch (err) {
//     console.log(err)
//   }
// }

// function totalCandidates() {
//   try {
//    var list_people = contractInstance.totalCandidates();
//    list_people.forEach(function(item){
//       console.log(web3.toAscii(item));
//    });
//   } catch (err) {
//     console.log(err)
//   }
// }


$(document).ready(function() {
  console.log(web3.eth.accounts[1]);
  var balance =  web3.eth.getBalance(web3.eth.accounts[3]);
  balance = web3.toDecimal(balance);
  console.log(balance);
  // contractInstance.addCandidate("Adarsh", "addy", "hello", "adarsh", web3.eth.accounts[3], {from: web3.eth.accounts[3]}, function() {
  //     console.log("Added");
  //   });
  var address = contractInstance.addCandidate.call("Adarsh", "addy", "hello", "adarsh", web3.eth.accounts[1], {from: web3.eth.accounts[3]});
  console.log(address);
  var p = contractInstance.countUsers.call();
  console.log(web3.toDecimal(p));
  var pp = contractInstance.getUser.call(web3.eth.accounts[1]);
  console.log(pp);
  // var address = contractInstance.addCandidate("Adarsh", "addy", "hello", "adarsh", web3.eth.accounts[1], {from: web3.eth.accounts[3]});
  // console.log(address);
  // candidateNames = Object.keys(candidates);
  // console.log(candidateNames);
  // var accounts = web3.personal.newAccount("hello");
  // console.log(accounts);
  // var balance =  web3.eth.getBalance(web3.eth.accounts[1]);
  // balance = web3.toDecimal(balance);
  // console.log(balance);
  // console.log(web3.personal.listAccounts);
  // var tx = {from: web3.eth.accounts[1] , to: web3.eth.accounts[12], value: web3.toWei(0.23, "ether")}
  // web3.personal.sendTransaction(tx, "hello")
  // var balance =  web3.eth.getBalance(web3.eth.accounts[1]);
  // balance = web3.toDecimal(balance);
  // console.log(balance);
  // var balance =  web3.eth.getBalance(web3.eth.accounts[12]);
  // balance = web3.toDecimal(balance);
  // console.log(balance);
  // for (var i = 0; i < candidateNames.length; i++) {
  //   let name = candidateNames[i];
  //   let val = contractInstance.totalVotesFor.call(name).toString()
  //   $("#" + candidates[name]).html(val);
  // }
});

