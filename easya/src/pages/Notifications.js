import NotificationTile from "../components/NotificationTile";
import { useState, useEffect } from 'react';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        // get notifications from connex
        setNotifications([{
            id: 1,
            title: "New Post",
            text: "A new post has been made in the community",
            icon: "📝"
        }, {
            id: 2,
            title: "New Comment",
            text: "A new comment has been made on your post",
            icon: "💬"
        }])
    }, []);

    return (
        <main>
            <div>
                <h1>Notifications</h1>
                {
                    notifications.map(({ id, title, text, icon }) => (
                        <NotificationTile key={id} title={title} text={text} icon={icon} />
                    ))
                }
            </div>
        </main>
    )
}