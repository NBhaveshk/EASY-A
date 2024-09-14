import styles from './Header.module.css'
import { useAuth } from '../Context'

export default function Header() {
    const { wallet_id } = useAuth()
    return (
        <header className={styles.header}>
            <h1>EasyA</h1>
            <p>{wallet_id}</p>
        </header>
    )
}