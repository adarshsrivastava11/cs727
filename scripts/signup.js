var interface = "";
var address = "";
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    JSONResponse = JSON.parse(this.responseText);
    interface = JSONResponse.interface;
    address = JSONResponse.address;
    console.log(interface);
    console.log(address);
    abi = JSON.parse(interface);
    VotingContract = web3.eth.contract(abi);
    contractInstance = VotingContract.at(address);
    console.log(contractInstance);
  }
};
xhttp.open("GET", "http://localhost:8080/user_contract/", true);
xhttp.send();

function addUser() {
  try {
    username = $("#username").val();
    console.log(username);
    account_address = $("#accountAddress").val();
    console.log(account_address);
    var logger = contractInstance.addUser(account_address, username, {from: web3.eth.accounts[0], gas: 300000});
    localStorage.setItem("account_address", account_address);
    localStorage.setItem("username", username);
    window.location = "./company_list.html";
    console.log(logger);
  } catch (err) {
    console.log(err)
  }
}

$(document).ready(function() {
});

