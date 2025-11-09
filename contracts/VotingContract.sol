// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "hardhat/console.sol";

contract Create {
    uint256 public _voterId;
    uint256 public _candidateId;

    address public votingOrganizer;

    //Candidate for voting
    struct Candidate {
        uint256 candidateId;
        uint256 age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    event CandidateCreated(
        uint256 indexed candidateId,
        uint256 age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    address[] public candidateAddresses;
    mapping(address => Candidate) public candidates;

    //// end of candidate data ////

    // VOTER data

    address[] public votedVoters;
    address[] public votersAddresses;
    mapping(address => Voter) public voters;

    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        uint256 voter_allowed;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
    }

    event VoterCreated(
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );

    // end of voter data

    constructor() {
        votingOrganizer = msg.sender;
    }

    function setCandidate(
        address _address,
        uint256 _age,
        string memory _name,
        string memory _image,
        string memory _ipfs
    ) public {
        require(
            msg.sender == votingOrganizer,
            "Only organizer can add candidates"
        );
        _candidateId++;
        Candidate memory newCandidate = Candidate({
            candidateId: _candidateId,
            age: _age,
            name: _name,
            image: _image,
            voteCount: 0,
            _address: _address,
            ipfs: _ipfs
        });

        candidateAddresses.push(_address);
        candidates[_address] = newCandidate;

        emit CandidateCreated(
            _candidateId,
            _age,
            _name,
            _image,
            newCandidate.voteCount,
            _address,
            _ipfs
        );
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddresses;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddresses.length;
    }

    function getCandidateDetails(
        address _address
    ) public view returns (Candidate memory) {
        return candidates[_address];
    }

    // voter functions

    function voterRight(
        address _voterAddress,
        string memory _voter_name,
        string memory _voter_image,
        uint256 _allowed,
        string memory _voter_ipfs
    ) public {
        require(
            msg.sender == votingOrganizer,
            "Only organizer can give voting rights"
        );
        require(_allowed == 0, "Voter already allowed");
        _voterId++;
        Voter memory newVoter = Voter({
            voter_voterId: _voterId,
            voter_name: _voter_name,
            voter_image: _voter_image,
            voter_address: _voterAddress,
            voter_allowed: _allowed,
            voter_voted: false,
            voter_vote: 1000,
            voter_ipfs: _voter_ipfs
        });

        votersAddresses.push(_voterAddress);
        voters[_voterAddress] = newVoter;

        emit VoterCreated(
            _voterId,
            _voter_name,
            _voter_image,
            _voterAddress,
            newVoter.voter_allowed,
            newVoter.voter_voted,
            newVoter.voter_vote,
            _voter_ipfs
        );
    }

    function vote(
        address _candidateAddress,
        uint256 _candidateVoteId
    ) external {
        Voter storage voter = voters[msg.sender];
        require(voter.voter_allowed != 0, "Has no right to vote");
        require(voter.voter_voted == false, "Already voted");

        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;

        Candidate storage candidate = candidates[_candidateAddress];
        candidate.voteCount += voter.voter_allowed;

        votedVoters.push(msg.sender);
    }

    function getVotersLength() public view returns (uint256) {
        return votersAddresses.length;
    }

    function getVoterData(
        address _voterAddress
    ) public view returns (Voter memory) {
        return voters[_voterAddress];
    }

    function getVoterVoterList() public view returns (address[] memory) {
        return votedVoters;
    }

    function getVoterList() public view returns (address[] memory) {
        return votersAddresses;
    }
}
