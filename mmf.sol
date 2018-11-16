pragma solidity^0.4.18;

contract Crowdfunding {
    address creater;
    address mFundCompany;
    uint totalInvestment;
    uint investDate;
    uint totalAmount;
    uint minInvestAmount;
    mapping(address => uint256) public investAmount;
    address[] public investorList;

    function Crowdfunding(address _mFundCompany, uint256 _minInvestAmount, uint256 _investDate) public {
        creater = msg.sender;
        mFundCompany = _mFundCompany;
        minInvestAmount = _minInvestAmount;
        investDate = _investDate;
        invest(msg.value);
    }
    function invest(uint256 amount) public payable {
        require(now < investDate);                // in the fundraising period
        require(msg.value == amount);
        totalInvestment += amount;
        investorList.push(msg.sender);
        investAmount[msg.sender] += amount;
    }
    function retToInvestors(uint256 amount) public payable{
        uint totalReturn = address(this).balance;
        uint userShare;
        uint numInvestors = investorList.length;
        address user;
        for (uint i = 0; i < investorList.length; i++){
            user = investorList[i];
            userShare = (totalReturn*investAmount[user])/totalInvestment;
            user.transfer(userShare);
        }
    }
    // function claimFunds() public {
    //     require(address(this).balance >= goal); // funding goal is met
    //     require(now >= deadline);               // in the withdrawal period
    //     require(msg.sender == creater);

    //     msg.sender.transfer(address(this).balance);
    // }
    // function getRefund() public {
    //     require(address(this).balance < goal);  // funding goal not met
    //     require(now >= deadline);               // in the withdrawal period

    //     uint256 amount = pledgeOf[msg.sender];
    //     pledgeOf[msg.sender] = 0;
    //     msg.sender.transfer(amount);
    // }
}