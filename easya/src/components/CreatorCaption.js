import styles from './Creator.module.css'

export default function CreatorCaption({ cover_photo, clothes_images, receipt_images, caption, set_caption, onComplete, onBack }) {

    return (
        <div>
            <div className={styles.selected_images}>{cover_photo.map((image) => <img src={image} alt="cover" />)}</div>
            <div className={styles.selected_images}>{clothes_images.map((image) => <img src={image} alt="clothes" />)}</div>
            <div className={styles.selected_images}>{receipt_images.map((image) => <img src={image} alt="receipts" />)}</div>
            <textarea value={caption} onChange={(event) => set_caption(event.target.value)} placeholder="Enter caption" />
            <button onClick={onBack}>Back</button>
            <button onClick={onComplete}>Post</button>
        </div>
    )
}