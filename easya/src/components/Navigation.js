import styles from './Navigation.module.css';

export default function Header({ className }) {
    return (
        <nav className={styles.navigation}>
            <div className={styles.options}>
                <div>Posts</div>
                <div>Create</div>
                <div>Notifications</div>
            </div>
        </nav>
    )
}