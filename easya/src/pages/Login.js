import styles from './Login.module.css';
import WalletConnect from '../components/WalletConnect';


export default function Community() {
    return (
        <div className={styles.centered}>
            <div className={styles.box}>
                <h1>Fashion Fiesta</h1>
                {<WalletConnect />}
            </div>
        </div>
    )
}