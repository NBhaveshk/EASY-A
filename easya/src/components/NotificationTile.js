import styles from './NotificationTile.module.css';
import { format } from 'date-fns'

export default function NotificationTile({ title, text, timestamp }) {
    return (
        <div className={styles.tile}>
            <header>
                <h3>{title}</h3>
                <span className={styles.time}>{format(timestamp, "dd LLL yyyy HH:mm")}</span>
            </header>
            <p>{text}</p>
            <hr />
        </div>
    )
}