import { Outlet } from 'react-router-dom';
import Header from './components/Header'
import Navigation from './components/Navigation';
import styles from './Layout.module.css';

export default function Layout() {
    return (
        <div className={styles.app}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Navigation />
        </div>
    )
}