import { useState, useEffect, useRef } from 'react';
import styles from './PostModal.module.css';
import { usePostModal } from '../Context';
import { ReactComponent as LeftArrow } from '../assets/icons/left.svg';
import { ReactComponent as RightArrow } from '../assets/icons/right.svg';

export default function PostModal({ data }) {
    const { clear_post_modal_data } = usePostModal();
    const [images, set_images] = useState([]);
    const {
        id,
        author,
        date,
        cover_image
    } = data;
    const image_container_ref = useRef(null);

    useEffect(() => {
        set_images([cover_image ])
    }, [id, cover_image])

    function handle_previous() {
        if (image_container_ref.current) {
            const scrollWidth = image_container_ref.current.clientWidth;
            image_container_ref.current.scrollBy({
                left: -scrollWidth,
                behavior: 'smooth'
            });
        }
    };

    function handle_next() {
        if (image_container_ref.current) {
            const scrollWidth = image_container_ref.current.clientWidth;
            image_container_ref.current.scrollBy({
                left: scrollWidth,
                behavior: 'smooth'
            });
        }
    };


    return (
        <div className={styles.background} onClick={clear_post_modal_data}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <div className={styles.image_controller}>
                    <button onClick={handle_previous}><LeftArrow className={styles.icon} /></button>
                    <div ref={image_container_ref} className={styles.image_container}>
                        {images}
                    </div>
                    <button onClick={handle_next}><RightArrow className={styles.icon} /></button>
                </div>
                <div>
                    <h1>{author}</h1>
                    <h2>{date}</h2>
                </div>
            </div>
        </div>
    )
}