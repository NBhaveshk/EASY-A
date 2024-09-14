import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context';
import WalletConnect from './WalletConnect';

export default function Header({ className }) {
    const { wallet_id } = useAuth()
    return (
        <nav className={styles.navigation}>
            <div className={styles.options}>
                {wallet_id && <Link to="/">Posts</Link>}
                {wallet_id && <Link to="/create">Create</Link>}
                {wallet_id && <Link to="/notifications">Notifications</Link>}
                {!wallet_id && <WalletConnect />}
            </div>
        </nav>
    )
}