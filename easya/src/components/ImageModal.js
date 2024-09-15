import React from 'react';

import ImageTile from './ImageTile'; // Adjust the path if necessary
import styles from './ImageModal.module.css'; // Import the CSS file for styles
import { usePostModal } from "../Context"
import { useCommunity } from '../Context';

const ImageGrid = () => {
  const { set_post_modal_data } = usePostModal()
  const { community_data } = useCommunity()

  return (
    <div className={styles.image_grid}>
      {community_data.map((data, index) => (
        <ImageTile key={index} imageSrc={data.cover_image} altText={`Image ${index + 1}`} onClick={() => set_post_modal_data({
          id: index,
          author: data.author,
          date: (new Date(Date.now() - Math.random() * (Date.now() - new Date().setFullYear(new Date().getFullYear() - 1)))).toString(),
          cover_image: data.images.map((image, index) => <img src={image} alt='placeholder' />)
        })} />
      ))}
    </div>
  );
};

export default ImageGrid;
