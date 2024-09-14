import FileSelector from "./FileSelector"
import styles from './Creator.module.css'

export default function CreatorReceipts({ receipt_images, set_receipt_images, onComplete, onBack }) {

    return (
        <div>
            {receipt_images && <div className={styles.selected_images}>{receipt_images.map((image) => <img src={image} alt="receipt" />)}</div>}
            <FileSelector set_files={set_receipt_images} drag_active_text="Drop Photo Here" drag_inactive_text="Select Receipt Photos" multiple={true} />
            <button onClick={onBack}>Back</button>
            <button disabled={!receipt_images || receipt_images.length === 0} onClick={onComplete}>Next</button>
        </div>
    )
}