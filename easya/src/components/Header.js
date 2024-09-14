import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useAuth } from '../Context'
import { ReactComponent as Icon } from '../assets/icons/bars.svg';

export default function Header() {
    const { wallet_id, logout } = useAuth()
    const navigate = useNavigate()

    function handle_logout() {
        logout()
        navigate('/')
    }

    return (
        <header className={styles.header}>
            <h1>Fashion Fiesta</h1>
            <div className={styles.menu}>
                <input type="checkbox" />
                <Icon className={styles.icon} />
                <div className={styles.dropdown}>
                    <p>{wallet_id.slice(0, 16)}</p>
                    <button onClick={handle_logout}>Logout</button>
                </div>
            </div>
        </header>
    )
}