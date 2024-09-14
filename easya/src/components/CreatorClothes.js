import FileSelector from "./FileSelector"
import styles from './Creator.module.css'

export default function CreatorClothes({ clothes_images, set_clothes_images, onComplete, onBack }) {

    return (
        <div>
            {clothes_images && <div className={styles.selected_images}>{clothes_images.map((image) => <img src={image} alt="clothes" />)}</div>}
            <FileSelector set_files={set_clothes_images} drag_active_text="Drop Photo Here" drag_inactive_text="Select Clothes Photos" multiple={true} />
            <button onClick={onBack}>Back</button>
            <button disabled={!clothes_images || clothes_images.length === 0} onClick={onComplete}>Next</button>
        </div>
    )
}