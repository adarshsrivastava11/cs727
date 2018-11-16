web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"nameOfCandidate","type":"bytes32"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalCandidates","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x59b72147ff1f1f35f70b5fe45ba833ca36696c42');
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3", "Addy": "candidate-4"}

function voteForCandidate(candidate) {
  candidateName = $("#candidate").val();
  try {
    contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
      let div_id = candidates[candidateName];
      $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
    });
  } catch (err) {
  }
}

function addCandidate(candidate) {
  candidateName = $("#candidate_name").val();
  try {
    contractInstance.addCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
      let div_id = candidates[candidateName];
      $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
    });
  } catch (err) {
    console.log(err)
  }
}

function totalCandidates() {
  try {
   var list_people = contractInstance.totalCandidates();
   list_people.forEach(function(item){
      console.log(web3.toAscii(item));
   });
  } catch (err) {
    console.log(err)
  }
}


$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  console.log(candidateNames);
  // var accounts = web3.personal.newAccount("hello");
  // console.log(accounts);
  var balance =  web3.eth.getBalance(web3.eth.accounts[1]);
  balance = web3.toDecimal(balance);
  console.log(balance);
  console.log(web3.personal.listAccounts);
  var tx = {from: web3.eth.accounts[1] , to: web3.eth.accounts[12], value: web3.toWei(0.23, "ether")}
  web3.personal.sendTransaction(tx, "hello")
  var balance =  web3.eth.getBalance(web3.eth.accounts[1]);
  balance = web3.toDecimal(balance);
  console.log(balance);
  var balance =  web3.eth.getBalance(web3.eth.accounts[12]);
  balance = web3.toDecimal(balance);
  console.log(balance);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});

