import React from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import ImageTile from './ImageTile'; // Adjust the path if necessary
import styles from './ImageModal.module.css'; // Import the CSS file for styles
import { usePostModal } from "../Context"

const ImageGrid = () => {
  const { set_post_modal_data } = usePostModal()
  const imagesA = [image1, image2, image3, image4];

  return (
    <div className={styles.image_grid}>
      {imagesA.map((image, index) => (
        <ImageTile key={index} imageSrc={image} altText={`Image ${index + 1}`} onClick={() => set_post_modal_data({
          id: index,
          author: `Author ${index}`,
          date: (new Date(Date.now() - Math.random() * (Date.now() - new Date().setFullYear(new Date().getFullYear() - 1)))).toString(),
          cover_image: <img src={image} alt={`${index + 1}`} />
        })} />
      ))}
    </div>
  );
};

export default ImageGrid;
