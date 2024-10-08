import FileSelector from "./FileSelector";
import styles from './Creator.module.css';

export default function CreateCoverImage({ cover_image, set_cover_image, onComplete, onBack }) {
    return (
        <div className={styles.coverImageContainer}>
            {cover_image && (
                <div className={styles.selectedImages}>
                    {cover_image.map((image, index) => (
                        <img key={index} src={image} alt="cover" className={styles.coverImage} />
                    ))}
                </div>
            )}
            <div className={styles.fileSelectorContainer}>
                <FileSelector
                    className={styles.fileSelectorInput}
                    set_files={set_cover_image}
                    drag_active_text="Drop Photo Here"
                    drag_inactive_text="Select Cover Photo"
                    multiple={false}
                />
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={onBack}>Exit</button>
                <button
                    className={`${styles.button} ${!cover_image ? styles.buttonDisabled : ''}`}
                    onClick={onComplete}
                    disabled={!cover_image}
                >
                    Next
                </button>
            </div>
        </div>
    );
}



