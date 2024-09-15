import React from 'react';
import image1 from '../assets/img3.jpg';
import image11 from '../assets/img1.jpg';
import image12 from '../assets/img2.jpg';
import image2 from '../assets/img4.jpg';
import image21 from '../assets/img5.jpg';
import image22 from '../assets/img6.jpg';
import image3 from '../assets/image1.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image3.jpg';

import ImageTile from './ImageTile'; // Adjust the path if necessary
import styles from './ImageModal.module.css'; // Import the CSS file for styles
import { usePostModal } from "../Context"

const ImageGrid = () => {
  const { set_post_modal_data } = usePostModal()
  const imagesA = [image1, image2, image3, image4,image5];
  const images = [[image1, image11, image12],[image2,image21,image22],[image3],[image4],[image5]];
  const authors = ["priyan", "Teja","Bhavesh","1","2"];

  return (
    <div className={styles.image_grid}>
      {images.map((images, index) => (
        <ImageTile key={index} imageSrc={images[0]} altText={`Image ${index + 1}`} onClick={() => set_post_modal_data({
          id: index,
          author:authors[index],
          date: (new Date(Date.now() - Math.random() * (Date.now() - new Date().setFullYear(new Date().getFullYear() - 1)))).toString(),
          cover_image: images.map((image,index) => <img src={image} alt='placeholder'/>)
        })} />
      ))}
    </div>
  );
};

export default ImageGrid;
