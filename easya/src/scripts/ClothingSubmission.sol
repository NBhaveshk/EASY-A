// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClothingSubmission {
    struct SubmissionData {
        string nameOfItem;
        string itemDescription;
        uint256 reward;
        bool hasClaimed;
    }

    // Mapping from user address to their submissions, which is stored as an array of submission structures.
    mapping(address => SubmissionData[]) private userSubmissions;

    // Array to store all submissions for public view of all photo submissions
    SubmissionData[] public allSubmissions;

    // Event to notify about new submission
    event SubmissionMade(address indexed user, string nameOfItem, string itemDescription, uint256 reward);

    // Function to submit a photo
    function submitPhoto(string memory nameOfItem, string memory description, uint256 reward) public {
        // Create the submission data
        SubmissionData memory newSubmission = SubmissionData({
            nameOfItem: nameOfItem,
            itemDescription: description,
            reward: reward,
            hasClaimed: false
        });

        // Store the submission in the user's submission mapping
        userSubmissions[msg.sender].push(newSubmission);

        // Store the submission in the public array
        allSubmissions.push(newSubmission);

        // Emit an event for the new submission
        emit SubmissionMade(msg.sender, nameOfItem, description, reward);
    }

    // Function to get submissions for a specific user
    function getUserSubmissions() public view returns (SubmissionData[] memory) {
        return userSubmissions[msg.sender];
    }

    // Function to get all submissions
    function getAllSubmissions() public view returns (SubmissionData[] memory) {
        return allSubmissions;
    }

    // Optionally, function to claim rewards
    function claimReward(uint256 index) public {
        require(index < userSubmissions[msg.sender].length, "Invalid submission index");
        SubmissionData storage submission = userSubmissions[msg.sender][index];
        require(!submission.hasClaimed, "Reward already claimed");

        // Mark as claimed
        submission.hasClaimed = true;

        // Logic to transfer reward, if applicable
        // ...
    }
}
