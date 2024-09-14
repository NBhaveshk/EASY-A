import React from 'react';
import styles from './ImageTile.module.css'; // Import the CSS file for styles

const ImageTile = ({ imageSrc, altText }) => {
  return (
    <div className={styles.image_tile}>
      <img
        src={imageSrc}
        alt={altText}
        className="image-tile-img"
      />
    </div>
  );
};

export default ImageTile;