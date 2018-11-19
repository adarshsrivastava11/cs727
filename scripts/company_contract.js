web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var account_address;
xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    JSONResponse = JSON.parse(this.responseText);
    console.log(JSONResponse)
    interface = JSONResponse.interface;
    address = JSONResponse.address;
    abi = JSON.parse(interface);
    VotingContract = web3.eth.contract(abi);
    contractInstance = VotingContract.at(address);
  }
};
var id = localStorage.getItem("company_id");
console.log(id);
xhttp.open("GET", "http://localhost:8080/company/"+id+"/", true);
xhttp.send();

function invest() {
  amount = $("#amount").val();
  amount = web3.toWei(amount,"ether");
  try {
    contractInstance.invest(amount, {from: account_address,value:amount,gas:6721975});
  } catch (err) {
    console.log(err);
  }
}

$(document).ready(function() {
  account_address  =  localStorage.getItem("account_address");
  username = localStorage.getItem("username");
  console.log(username);
  document.getElementById("username").innerHTML = username;
});

