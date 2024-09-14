import React from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import ImageTile from './ImageTile'; // Adjust the path if necessary
import styles from './ImageModal.module.css'; // Import the CSS file for styles

const ImageGrid = () => {
  const imagesA = [image1, image2, image3, image4];

  return (
    <div className={styles.image_grid}>
      {imagesA.map((image, index) => (
        <ImageTile key={index} imageSrc={image} altText={`Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default ImageGrid;
