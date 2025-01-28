// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
    }
    mapping(uint => mapping(address => bool)) public approvals;

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    modifier requireValidRequestIndex(uint index) {
        require(index < requests.length, "Invalid request index");
        _;
    }

    constructor(uint minimum, address managerAddress) {
        manager = managerAddress;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.sender != manager);
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function getRequestDescription(
        uint index
    )
        public
        view
        requireValidRequestIndex(index)
        returns (string memory description)
    {
        Request storage request = requests[index];
        return request.description;
    }

    function createRequest(
        string calldata description,
        uint value,
        address payable recipient
    ) public restricted {
        requests.push(
            Request({
                description: description,
                value: value,
                recipient: recipient,
                complete: false,
                approvalCount: 0
            })
        );
    }

    function approveRequest(uint index) public requireValidRequestIndex(index) {
        require(approvers[msg.sender], "You are not a contributor");
        require(
            !approvals[index][msg.sender],
            "You have already approved this request"
        );

        approvals[index][msg.sender] = true;
        requests[index].approvalCount++;
    }

    function finalizeRequest(
        uint index
    ) public restricted requireValidRequestIndex(index) {
        Request storage request = requests[index];
        require(!request.complete, "Request is already complete!");
        require(
            request.approvalCount > (approversCount / 2),
            "Not enough approvals to process."
        );

        request.recipient.transfer(request.value);

        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (uint, uint, uint, uint, address)
    {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
