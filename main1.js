const http = require('http');
const fs = require('fs');
const solc = require('solc')
const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const address = web3.eth.accounts[0];

var code = fs.readFileSync('mmf.sol').toString()
var compiledCode = solc.compile(code)
var abiDefinition = JSON.parse(compiledCode.contracts[':Crowdfunding'].interface)
console.log(compiledCode.contracts[':Crowdfunding'].interface)
var byteCode = compiledCode.contracts[':Crowdfunding'].bytecode
var contractAddress;
var VotingContract = web3.eth.contract(abiDefinition)
var deployedContract = VotingContract.new(web3.eth.accounts[4], 2, 23,{
  data: byteCode,
  from: web3.eth.accounts[1], gas: 4712388, gasPrice: 100000,
}, (err, contract) => {
  contractAddress = contract.address;
  console.log(contractAddress);
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var data = {
  	interface: compiledCode.contracts[':Crowdfunding'].interface,
  	address: contractAddress
  };
  data = JSON.stringify(data);
  res.write(data)
  res.end();
}).listen(8081);


