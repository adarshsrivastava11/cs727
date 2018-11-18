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

function invest() {
  amount = $("#amount").val();
  amount = web3.toWei(amount,"ether");
  try {
    contractInstance.invest(amount, {from: web3.eth.accounts[1],value:amount,gas:6721975});
  } catch (err) {
    console.log(err);
  }
}

function sendToCompany() {
  try {
    contractInstance.sendToCompany({from: web3.eth.accounts[7]});
  } catch (err) {
    console.log(err);
  }
}

function returnToInvestors() {
  amount = $("#amount").val();
  amount = web3.toWei(amount,"ether");
  try {
    contractInstance.returnToInvestors(amount,{from: web3.eth.accounts[7],value:amount});
  } catch (err) {
    console.log(err)
  }
}


$(document).ready(function() {

});

