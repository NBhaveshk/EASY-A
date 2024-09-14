// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClothingSubmission {
   struct SubmissionData {
       string itemName;
       string storeName;
       string fabricName;
       string imageUrl;
       uint256 numberOfClicks;
       uint256 tokensRewarded;
       string itemDescription;
   }

   // Mapping from user address to their submissions, which is stored as an array of submission structures.
   mapping(address => SubmissionData[]) private userSubmissions;

   // Array to store all submissions for public view of all photo submissions.
   SubmissionData[] public allSubmissions;

   // Event to notify about new submission (Check if event is triggered on the frontend to potentially add transaction to the event log)
   event SubmissionMade(address indexed user, string itemName, string storeName, string fabricName);

   // Function to submit a photo
   function submitPhoto(string memory itemName, string memory storeName, string memory fabricName, string memory imageUrl, string memory itemDescription) public {
       // Create the submission data
       SubmissionData memory newSubmission = SubmissionData({
           itemName: itemName,
           storeName: storeName,
           fabricName: fabricName,
           imageUrl: imageUrl,
           numberOfClicks: 0,
           tokensRewarded: 0,
           itemDescription: itemDescription
       });

       // Store the submission in the user's submission mapping
       userSubmissions[msg.sender].push(newSubmission);

       // Store the submission in the public array
       allSubmissions.push(newSubmission);

       // Emit an event for the new submission
       emit SubmissionMade(msg.sender, itemName, storeName, fabricName);
   }

   // Function to get submissions for a specific user
   function getUserSubmissions() public view returns (SubmissionData[] memory) {
       return userSubmissions[msg.sender];
   }

   // Function to get all submissions
   function getAllSubmissions() public view returns (SubmissionData[] memory) {
       return allSubmissions;
   }
}

