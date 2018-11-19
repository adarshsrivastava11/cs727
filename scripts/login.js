var interface = "";
var address = "";
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    JSONResponse = JSON.parse(this.responseText);
    console.log(JSONResponse);
    interface = JSONResponse.interface;
    address = JSONResponse.address;
    console.log(interface);
    console.log(address);
    abi = JSON.parse(interface);
    VotingContract = web3.eth.contract(abi);
    contractInstance = VotingContract.at(address);
  }
};
xhttp.open("GET", "http://localhost:8080/user_contract/", true);
xhttp.send();
console.log(interface);


function isUser() {
  try {
    username = $("#username").val();
    account_address = $("#accountAddress").val();
    var status = contractInstance.isUser(username, {from: account_address});
    console.log(web3.toAscii(status));
    localStorage.setItem("account_address", account_address);
    window.location = "../company_list.html";
  } catch (err) {
    console.log(err)
  }
}


$(document).ready(function() {
});

