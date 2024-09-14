import React from 'react';
import styles from './ImageTile.module.css'; // Import the CSS file for styles

const ImageTile = ({ imageSrc, altText, onClick }) => {
  return (
    <div className={styles.image_tile}>
      <img
        src={imageSrc}
        alt={altText}
        onClick={onClick}
        className="image-tile-img"
      />
    </div>
  );
};

export default ImageTile;