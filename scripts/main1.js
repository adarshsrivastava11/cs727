const http = require('http');
const fs = require('fs');
const solc = require('solc')
const Web3 = require('web3');
const web3 = new Web3();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs727');
var db = mongoose.connection;

var Schema = mongoose.Schema;

var userManagementSchema = new Schema({
     interface: String,
     address: String,
 });
var User = mongoose.model("user_management_contract", userManagementSchema);

var companySchema = new Schema({
     interface: String,
     address: String,
     companyAddress: String,
     companyId: String
 });
var Company = mongoose.model("company_contract", companySchema);

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));




var address = web3.eth.accounts[7];
var code = fs.readFileSync('../contracts/MMF.sol').toString()
var compiledCode = solc.compile(code)
console.log(compiledCode);
var abiDefinition = JSON.parse(compiledCode.contracts[':Mmf'].interface)
var interface = compiledCode.contracts[':Mmf'].interface
var byteCode = compiledCode.contracts[':Mmf'].bytecode
var contractAddress;
var VotingContract = web3.eth.contract(abiDefinition)
var deployedContract = VotingContract.new(address, 2, 23, {
  data: byteCode,
  from: address, gas: 4712388
}, (err, contract) => {
	contractAddress = contract.address;
  var company = new Company({
    interface: interface,
    address: contractAddress,
    companyAddress: address,
    companyId: '7'
  });
  company.save(function(error) {
     console.log("Company A's Contract Deployed");
  if (error) {
     console.error(error);
  }
})
});

