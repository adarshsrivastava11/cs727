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
id = parseInt(id);
xhttp.open("GET", "http://localhost:8080/company/"+id+"/", true);
xhttp.send();

function sendToCompany() {
  try {
    console.log("id was "+id);
    console.log(web3.eth.accounts[id]);
    contractInstance.sendToCompany({from: web3.eth.accounts[id]});
  } catch (err) {
    console.log(err);
  }
}

function returnToInvestors() {
  amount = $("#amount").val();
  amount = web3.toWei(amount,"ether"); // Calculate this amount Directly
  try {
    contractInstance.returnToInvestors(amount,{from: web3.eth.accounts[id],value:amount});
  } catch (err) {
    console.log(err)
  }
}


$(document).ready(function() {
  account_address  =  localStorage.getItem("account_address");
});

