import FileSelector from "./FileSelector"
import styles from './Creator.module.css'

export default function CreatorClothes({ clothes_images, set_clothes_images, onComplete, onBack }) {

    function set_image(files) {
        set_clothes_images(files.map(element => {
            return <img src={element} alt="clothe" />
        }));
    }

    return (
        <div>
            <div className={styles.selected_images}>{clothes_images}</div>
            <FileSelector set_files={set_image} drag_active_text="Drop Photo Here" drag_inactive_text="Select Clothes Photos" multiple={true} />
            <button onClick={onBack}>Back</button>
            <button disabled={!clothes_images || clothes_images.length === 0} onClick={onComplete}>Next</button>
        </div>
    )
}