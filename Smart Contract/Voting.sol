//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Voting {
    /* 
        0 not eligible to vote (NOT KYCed yet)
        1 eligible to vote
        2 voted
    */
    error NotOwner();
    error NotCandidate();

    event VotedSuccessfully(uint vote);
    event VoterEligibilitySet(address voter, uint eligibilityStatus);

    struct VotingList {
        string  Name1;
        string  Name2;
        uint    Name1Votes;
        uint    Name2Votes;
    }

    address public owner;

    struct Voter {
        uint ifVoted;
    }

    mapping(address => Voter) EligibleVoter;

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    VotingList public votingList;

    constructor(string memory _name1, string memory _name2) {
        owner = msg.sender;
        votingList.Name1 = _name1;
        votingList.Name2 = _name2;
    }

    function Vote(string memory _votedfor) public {
        Voter storage voter = EligibleVoter[msg.sender];
        require(voter.ifVoted == 1, "Not eligible to vote");

        if (keccak256(abi.encodePacked(votingList.Name1)) == keccak256(abi.encodePacked(_votedfor))) {
            votingList.Name1Votes += 1;
        } else if (keccak256(abi.encodePacked(votingList.Name2)) == keccak256(abi.encodePacked(_votedfor))) {
            votingList.Name2Votes += 1;
        } else {
            revert NotCandidate();
        }

        voter.ifVoted = 2;  // Mark voter as having voted
        emit VotedSuccessfully(voter.ifVoted);
    }

    function EligibleToVote(address _voter) public onlyOwner {
        EligibleVoter[_voter].ifVoted = 1;
        emit VoterEligibilitySet(_voter, 1);  // Emit event for transparency
    }

    function getNumberOfVotes() public view returns(uint, uint) {
        return (votingList.Name1Votes, votingList.Name2Votes);
    }

    function getIfEligibleToVote() public view returns(uint) {
        return EligibleVoter[msg.sender].ifVoted;
    }
}
