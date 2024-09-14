import React, { useState, useRef } from 'react';

// Function to send image to OpenAI API and receive response
const sendToOpenAI = async (base64) => {
  const apiKey = "sk-y572_ewyYAVZ-iq-hrrGks88wbXaOI6SqbbbL_BXNLT3BlbkFJCJFOq_2nHGJvmAOYgF9yVKimblYY7mVGPLgh7UsykA"; // Read the API key from environment variables
  const endpoint = "https://api.openai.com/v1/chat/completions"; // Correct API endpoint
  console.log("API Key:", apiKey);

  try {
    console.log('Sending request to OpenAI API with key:', apiKey); // Debug logging

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // Correct header format
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              { 
                type: 'text', 
                text: `Given this image of a receipt, extract the items that have been bought, the store/brand name, and the date of purchase.
                The return value must be in JSON format, do not enclose it in any comments. This is an example: {"items": {"item1": quantity1, "item2": quantity2}, "brand": "storeName", "date": "YYYY-MM-DD"}.
                The items should be those purchased, and the quantity bought. If a quantity cannot be determined, mark it as 1.
                If a date or brand cannot be identified, return null for them.` 
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Get detailed error message
      console.error('Error details:', errorDetails); // Log error details
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    const jsonString = data.choices[0].message.content.trim();
    console.log(jsonString);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default function ImageUploadScreen() {
  const [photoData, setPhotoData] = useState(null); // State to store the uploaded image data
  const [result, setResult] = useState(null); // State to store the final result
  const fileInputRef = useRef(null); // Reference to the file input

  // Handle file upload and processing
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1]; // Extract base64 from DataURL
        setPhotoData(reader.result); // Save base64 DataURL to display the image

        try {
          // Send base64 string to OpenAI for processing
          const values = await sendToOpenAI(base64String);

          // Extract date, brand, and items from OpenAI's response
          const { items, brand, date } = values;

          if (!date) {
            alert('Date not found in the receipt.');
            return;
          }

          // Check if the date is within 2 days from today
          const today = new Date();
          const purchaseDate = new Date(date);
          const timeDifference = Math.abs(today - purchaseDate);
          const differenceInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

          const isWithinTwoDays = differenceInDays <= 2;

          // Prepare the result to display
          setResult({
            brand: brand || "Unknown Brand",
            items: items || {},
            isWithinTwoDays
          });

          alert(`The brand is ${brand}. Date is within 2 days: ${isWithinTwoDays}`);
        } catch (error) {
          alert('Error processing image. Please try again.');
        }
      };
      reader.readAsDataURL(file); // Convert the file to base64 (DataURL)
    }
  };

  // Function to reset the uploaded image and allow the user to upload another one
  const retakePicture = () => {
    setPhotoData(null); // Reset the uploaded image
    setResult(null); // Clear the result
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
  };

  return (
    <div style={styles.container}>
      {photoData ? (
        // Display the uploaded photo and provide an option to upload a new one
        <div style={styles.container}>
          <img src={photoData} alt="Uploaded" style={styles.capturedPhoto} />
          <button onClick={retakePicture}>Retake Photo</button>
          {result && (
            <div style={styles.resultContainer}>
              <h3>Result</h3>
              <p><strong>Brand:</strong> {result.brand}</p>
              <p><strong>Date within 2 days:</strong> {result.isWithinTwoDays ? "Yes" : "No"}</p>
              <p><strong>Items Purchased:</strong></p>
              <ul>
                {Object.entries(result.items).map(([item, quantity]) => (
                  <li key={item}>{item}: {quantity}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        // If no image has been uploaded yet, show the file input and upload button
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.input}
          />
          <button onClick={() => fileInputRef.current.click()}>Upload Image</button>
        </div>
      )}
    </div>
  );
}

// Inline styles for basic layout
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  input: {
    display: 'none', // Hide the input field and trigger it with the button
  },
  capturedPhoto: {
    maxWidth: '100%', // Ensure the uploaded image fits within the viewport
    maxHeight: '80vh',
  },
  resultContainer: {
    marginTop: '20px',
    textAlign: 'left',
  }
};
