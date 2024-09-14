import FileSelector from "./FileSelector"
import styles from './Creator.module.css'

export default function CreatorCoverImage({ cover_image, set_cover_image, onComplete, onBack }) {

    function set_image(files) {
        set_cover_image(<img src={files[0]} alt="cover" />);
    }

    return (
        <div>
            <div className={styles.selected_images}>{cover_image}</div>
            <FileSelector set_files={set_image} drag_active_text="Drop Photo Here" drag_inactive_text="Select Cover Photo" multiple={false} />
            <button onClick={onBack}>Exit</button>
            <button disabled={!cover_image} onClick={onComplete}>Next</button>
        </div>
    )
}