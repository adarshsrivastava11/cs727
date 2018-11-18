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
xhttp.open("GET", "http://localhost:8081", true);
xhttp.send();
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
  var check= contractInstance.invest.call(10, {value:10, from: web3.eth.accounts[1],gas:3000000});
  console.log(check);
  var check= contractInstance.invest.call(10, {value:10, from: web3.eth.accounts[2],gas:3000000});
  console.log(check);
  var check= contractInstance.invest.call(10, {value:10, from: web3.eth.accounts[3],gas:3000000});
  console.log(check);
  var balance =  web3.eth.getBalance(web3.eth.accounts[1]);
  balance = web3.toDecimal(balance);
  console.log(balance);
  var balance =  web3.eth.getBalance(web3.eth.accounts[2]);
  balance = web3.toDecimal(balance);
  console.log(balance);
  var balance =  web3.eth.getBalance(web3.eth.accounts[3]);
  balance = web3.toDecimal(balance);
  console.log(balance);
  var check= contractInstance.sendToCompany.call({from:web3.eth.accounts[1]});
  check = web3.toDecimal(check);
  console.log(check);
  // contractInstance.addCandidate("Adarsh", "addy", "hello", "adarsh", web3.eth.accounts[3], {from: web3.eth.accounts[3]}, function() {
  //     console.log("Added");
  //   });
  // var address = contractInstance.addCandidate.call("Adarsh", "addy", "hello", "adarsh", web3.eth.accounts[1], {from: web3.eth.accounts[3]});
  // console.log(address);
  // var p = contractInstance.countUsers.call();
  // console.log(web3.toDecimal(p));
  // var pp = contractInstance.getUser.call(web3.eth.accounts[1]);
  // console.log(pp);
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

