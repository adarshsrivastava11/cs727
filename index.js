var interface = "";
var address = "";
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    JSONResponse = JSON.parse(this.responseText);
    interface = JSONResponse.interface;
    address = JSONResponse.address;
    abi = JSON.parse(interface);
    VotingContract = web3.eth.contract(abi);
    contractInstance = VotingContract.at(address);
  }
};
xhttp.open("GET", "http://localhost:8080", true);
xhttp.send();
console.log(interface);


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

function addUser(candidate) {
  try {
    var logger = contractInstance.addUser(web3.eth.accounts[6], "adarsh", "bye", {from: web3.eth.accounts[0], gas: 300000});
    console.log(logger);
  } catch (err) {
    console.log(err)
  }
}

function totalUsers() {
  try {
   var list_people = contractInstance.totalUsers();
   list_people.forEach(function(item){
      console.log(item);
   });
  } catch (err) {
    console.log(err)
  }
}

function isUser() {
  try {
   var user_pass = contractInstance.isUser("adarsh");
   console.log(web3.toAscii(user_pass));
  } catch (err) {
    console.log(err)
  }
}


$(document).ready(function() {
  console.log(web3.eth.accounts[0]);
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
  // console.log(balance);
});

