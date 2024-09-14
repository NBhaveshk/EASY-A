import styles from './NotificationTile.module.css';

export default function NotificationTile({ title, text, icon }) {
    return (
        <div className={styles.tile}>
            <header>
                <img src={icon} alt="icon" />
                <h3>{title}</h3>
            </header>
            <p>{text}</p>
            <hr />
        </div>
    )
}