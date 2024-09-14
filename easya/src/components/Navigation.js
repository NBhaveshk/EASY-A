import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';

export default function Header({ className }) {
    return (
        <nav className={styles.navigation}>
            <div className={styles.options}>
                <Link to="/">Posts</Link>
                <Link to="/create">Create</Link>
                <Link to="/notifications">Notifications</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    )
}