import React, { useState, useRef } from 'react';

// Function to send image to OpenAI API and receive response
const sendToOpenAI = async (base64, type) => {
  const apiKey = "sk-y572_ewyYAVZ-iq-hrrGks88wbXaOI6SqbbbL_BXNLT3BlbkFJCJFOq_2nHGJvmAOYgF9yVKimblYY7mVGPLgh7UsykA"; // Read the API key from environment variables
  const endpoint = "https://api.openai.com/v1/chat/completions"; // Correct API endpoint
  
  try {
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
                text: type === 'receipt'
                  ? `Given this image of a receipt, extract the items that have been bought, the store/brand name, and the date of purchase.
                The return value must be in JSON format, do not enclose it in any comments. This is an example: {"items": {"item1": quantity1, "item2": quantity2}, "brand": "storeName", "date": "YYYY-MM-DD"}.
                The items should be those purchased, and the quantity bought. If a quantity cannot be determined, mark it as 1.
                If a date or brand cannot be identified, return null for them.`
                  : `Given this image of a cloth, identify the fabric type and provide a very short description about the cloth. 
                The return value must be in JSON format, do not enclose it in any comments. This is an example: {"fabric":"cloth fabric","description":"a very short description"}.`,
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
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default function ImageUploadScreen() {
  const [photoData, setPhotoData] = useState(null); // State to store the uploaded receipt image data
  const [shirtData, setShirtData] = useState(null); // State to store the uploaded shirt image data
  const [result, setResult] = useState(null); // State to store the receipt result
  const [fabricResult, setFabricResult] = useState(null); // State to store the fabric result
  const fileInputRef = useRef(null); // Reference to the file input for receipt
  const shirtInputRef = useRef(null); // Reference to the file input for shirt

  // Handle file upload for receipt and processing
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1]; // Extract base64 from DataURL
        setPhotoData(reader.result); // Save base64 DataURL to display the image

        try {
          // Send base64 string to OpenAI for processing
          const values = await sendToOpenAI(base64String, 'receipt');

          // Extract date, brand, and items from OpenAI's response
          const parsedValues = JSON.parse(values);
          const { items, brand, date } = parsedValues;

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

  // Handle file upload for shirt and processing
  const handleShirtFileChange = async (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1]; // Extract base64 from DataURL
        setShirtData(reader.result); // Save base64 DataURL to display the image

        try {
          // Send base64 string to OpenAI for processing
          const fabricResponse = await sendToOpenAI(base64String, 'shirt');
          
          // Parse JSON response
          const parsedValues = JSON.parse(fabricResponse);
          const { fabric, description } = parsedValues;

          // Prepare the result to display
          setFabricResult({
            fabric: fabric || "Unknown Fabric",
            description: description || "No description available",
          });

          alert(`Fabric type detected: ${fabric || "Unknown Fabric"}. Description: ${description || "No description available"}`);
        } catch (error) {
          alert('Error processing shirt image. Please try again.');
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

  // Function to reset the uploaded shirt image and result
  const retakeShirtPicture = () => {
    setShirtData(null); // Reset the uploaded shirt image
    setFabricResult(null); // Clear the fabric result
    if (shirtInputRef.current) {
      shirtInputRef.current.value = ''; // Clear the shirt file input
    }
  };

  return (
    <div style={styles.container}>
      {/* Receipt Image Upload Section */}
      {photoData ? (
        <div style={styles.container}>
          <img src={photoData} alt="Uploaded Receipt" style={styles.capturedPhoto} />
          <button onClick={retakePicture}>Retake Receipt Photo</button>
          {result && (
            <div style={styles.resultContainer}>
              <h3>Receipt Result</h3>
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
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.input}
          />
          <button onClick={() => fileInputRef.current.click()}>Upload Receipt Image</button>
        </div>
      )}

      {/* Shirt Image Upload Section */}
      {shirtData ? (
        <div style={styles.container}>
          <img src={shirtData} alt="Uploaded Shirt" style={styles.capturedPhoto} />
          <button onClick={retakeShirtPicture}>Retake Shirt Photo</button>
          {fabricResult && (
            <div style={styles.resultContainer}>
              <h3>Fabric Type</h3>
              <p><strong>Fabric:</strong> {fabricResult.fabric}</p>
              <p><strong>Description:</strong> {fabricResult.description}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            ref={shirtInputRef}
            type="file"
            accept="image/*"
            onChange={handleShirtFileChange}
            style={styles.input}
          />
          <button onClick={() => shirtInputRef.current.click()}>Upload Shirt Image</button>
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
