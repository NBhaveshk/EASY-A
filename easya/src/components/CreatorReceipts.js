import FileSelector from "./FileSelector";
import styles from './Creator.module.css';

export default function CreateReceipts({ receipt_images, set_receipt_images, onComplete, onBack, isNextAllowed }) {
    return (
        <div className={styles.coverImageContainer}>
            {receipt_images.length > 0 && (
                <div className={styles.selectedImages}>
                    {receipt_images.map((image, index) => (
                        <img key={index} src={image} alt="receipt" className={styles.coverImage} />
                    ))}
                </div>
            )}
            <div className={styles.fileSelectorContainer}>
                <FileSelector
                    className={styles.fileSelectorInput}
                    set_files={set_receipt_images}
                    drag_active_text="Drop Photo Here"
                    drag_inactive_text="Select Receipt Photos"
                    multiple={true}
                />
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={onBack}>Back</button>
                <button
                    className={`${styles.button} ${!isNextAllowed ? styles.buttonDisabled : ''}`}
                    onClick={onComplete}
                    disabled={!isNextAllowed}
                >
                    Next
                </button>
            </div>
        </div>
    );
}


