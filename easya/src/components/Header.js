import styles from './Header.module.css'

export default function Header({ wallet_ID }) {
    return (
        <header className={styles.header}>
            <h1>EasyA</h1>
            <p>{wallet_ID}</p>
        </header>
    )
}