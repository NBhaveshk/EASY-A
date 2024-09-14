 import React from 'react';
import ImageGrid from '../components/ImageModal'; // Ensure the path is correct

export default function App() {
  return (
    <div className="App">
    <h1 style={{ textAlign: 'center', fontSize: '10rem' }}>Fashion Fiesta</h1>
    <ImageGrid />  {/* Render the ImageGrid component */}
    </div>
  );
}
