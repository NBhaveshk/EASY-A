import styles from './Creator.module.css';

export default function CreateCaption({ cover_photo, clothes_images, receipt_images, caption, set_caption, onBack, onComplete }) {
    return (
        <div className={styles.captionContainer}>
            {cover_photo && (
                <img src={cover_photo} alt="cover" className={styles.previewImage} />
            )}
            <div className={styles.previewImages}>
                {clothes_images.map((image, index) => (
                    <img key={index} src={image} alt={`clothes-${index}`} className={styles.previewImage} />
                ))}
                {receipt_images.map((image, index) => (
                    <img key={index} src={image} alt={`receipt-${index}`} className={styles.previewImage} />
                ))}
            </div>
            <div className={styles.captionArea}>
                <textarea
                    className={styles.captionInput}
                    value={caption}
                    onChange={(e) => set_caption(e.target.value)}
                    placeholder="Enter your caption here..."
                />
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={onBack}>Back</button>
                <button
                    className={`${styles.button} ${!caption ? styles.buttonDisabled : ''}`}
                    onClick={onComplete}
                    disabled={!caption}
                >
                    Create Post
                </button>
            </div>
        </div>
    );
}


