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

User.collection.drop();
Company.collection.drop();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var address = web3.eth.accounts[0];
var code = fs.readFileSync('../contracts/Voting.sol').toString()
var compiledCode = solc.compile(code)
var abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
var interface = compiledCode.contracts[':Voting'].interface
console.log(interface);
var byteCode = compiledCode.contracts[':Voting'].bytecode
var contractAddress;
var VotingContract = web3.eth.contract(abiDefinition)
var deployedContract = VotingContract.new([address], {
  data: byteCode,
  from: web3.eth.accounts[0], gas: 4712388
}, (err, contract) => {
	contractAddress = contract.address;
  console.log(contractAddress);
  console.log(interface);
  var user = new User({
    interface: interface,
    address: contractAddress
  });
  user.save(function(error) {
     console.log("User Management Contract Deployed");
  if (error) {
     console.error(error);
  }
})
});
