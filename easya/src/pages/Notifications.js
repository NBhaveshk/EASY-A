import NotificationTile from "../components/NotificationTile";
import { useState, useEffect } from 'react';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        // get notifications from connex
        setNotifications([{
            id: 1,
            title: "Transaction Log",
            text: "1 B3TR has been credited to your wallet",
            timestamp: new Date(Date.now() - Math.random() * (Date.now() - new Date().setFullYear(new Date().getFullYear() - 1)))
        }, {
            id: 2,
            title: "Transaction Log",
            text: "2 B3TR has been credited to your wallet",
            timestamp: new Date(Date.now() - Math.random() * (Date.now() - new Date().setFullYear(new Date().getFullYear() - 1)))
        }])
    }, []);

    return (
        <main>
            {
                notifications.map(({ id, title, text, timestamp }) => (
                    <NotificationTile key={id} title={title} text={text} timestamp={timestamp} />
                ))
            }
        </main>
    )
}