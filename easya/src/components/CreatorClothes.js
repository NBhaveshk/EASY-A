import FileSelector from "./FileSelector";
import styles from './Creator.module.css';

export default function CreateClothes({ clothes_images, set_clothes_images, onBack, onComplete }) {
    return (
        <div className={styles.clothesContainer}>
            {clothes_images.length > 0 && (
                <div className={styles.clothesImages}>
                    {clothes_images.map((image, index) => (
                        <img key={index} src={image} alt={`clothes-${index}`} className={styles.clothesImage} />
                    ))}
                </div>
            )}
            <div className={styles.fileSelectorContainer}>
                <FileSelector
                    className={styles.fileSelectorInput}
                    set_files={set_clothes_images}
                    drag_active_text="Drop Clothes Here"
                    drag_inactive_text="Select Clothes Images"
                    multiple={true}
                />
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={onBack}>Back</button>
                <button
                    className={`${styles.button} ${clothes_images.length === 0 ? styles.buttonDisabled : ''}`}
                    onClick={onComplete}
                    disabled={clothes_images.length === 0}
                >
                    Next
                </button>
            </div>
        </div>
    );
}



