import FileSelector from "./FileSelector"
import styles from './Creator.module.css'

export default function CreatorCoverImage({ cover_image, set_cover_image, onComplete, onBack }) {

    return (
        <div>
            {cover_image && <div className={styles.selected_images}>{cover_image.map((image) => <img src={image} alt="cover" />)}</div>}
            <FileSelector set_files={set_cover_image} drag_active_text="Drop Photo Here" drag_inactive_text="Select Cover Photo" multiple={false} />
            <button onClick={onBack}>Exit</button>
            <button disabled={!cover_image} onClick={onComplete}>Next</button>
        </div>
    )
}