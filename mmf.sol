pragma solidity^0.4.18;

contract Crowdfunding {
    address creator;
    address company;
    uint totalInvestment;
    uint investDate;
    uint totalAmount;
    uint minInvestAmount;
    mapping(address => uint256) public investAmount;
    address[] public investorList;

    function Crowdfunding(address _company, uint256 _minInvestAmount, uint256 _investDate) public {
        creator = msg.sender;
        company = _company;
        minInvestAmount = _minInvestAmount;
        investDate = _investDate;
        //invest(msg.value);
    }
    function invest(uint256 amount) public payable returns (bool) {
        // require(now < investDate);                // in the fundraising period
        require(msg.value == amount);
        totalInvestment += amount;
        investorList.push(msg.sender);
        investAmount[msg.sender] += amount;
        return true;
    }
    function sendToCompany() public returns (uint) {
        require(msg.sender == creator);
        uint amountSent = address(this).balance;
        company.transfer(amountSent);
        return amountSent;
    }
    function getBalance() public returns(uint){
        return address(this).balance;
    }
    function returnToInvestors(uint amount) public payable returns(uint){
        require(msg.value == amount);
        uint totalReturn = address(this).balance;
        uint userShare;
        address user;
        for (uint i = 0; i < investorList.length; i++){
            user = investorList[i];
            userShare = (totalReturn*investAmount[user])/totalInvestment;
            address(user).transfer(userShare);
        }
        return totalReturn;
    }
}