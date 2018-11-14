
const fs = require('fs');
const solc = require('solc')
const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const address = web3.eth.accounts[0];

const code = fs.readFileSync('Voting.sol').toString()
const compiledCode = solc.compile(code)

const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
console.log(compiledCode.contracts[':Voting'].interface)
const byteCode = compiledCode.contracts[':Voting'].bytecode

const VotingContract = web3.eth.contract(abiDefinition)
var accounts = web3.eth.accounts.create();
console.log(accounts)
const deployedContract = VotingContract.new(['Rama','Nick','Jose'], {
  data: byteCode,
  from: web3.eth.accounts[0], gas: 4712388
}, (err, contract) => {
	console.log(contract.address);
});
//console.log(deployedContract);
