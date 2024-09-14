import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as CreateIcon } from '../assets/icons/create.svg';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as HistoryIcon } from '../assets/icons/history.svg';


export default function Header({ className }) {
    return (
        <nav className={styles.navigation}>
            <div className={styles.options}>
                <Link to="/"><HomeIcon className={styles.icon} /></Link>
                <Link to="/create"><CreateIcon className={styles.icon} /></Link>
                <Link to="/notifications"><HistoryIcon className={styles.icon} /></Link>
            </div>
        </nav>
    )
}