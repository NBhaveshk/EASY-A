import { Outlet } from 'react-router-dom';
import Header from './components/Header'
import Navigation from './components/Navigation';

export default function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Navigation />
        </div>
    )
}