import { BrowserRouter, Routes, Route } from "react-router-dom"
import Community from "./pages/Community"
import Layout from "./Layout"
import Login from "./pages/Login"
import Create from "./pages/Create"
import Notifications from "./pages/Notifications"
import { useAuth } from "./Context"

export default function Router() {
    const { wallet_id } = useAuth()

    return (
        <BrowserRouter>
            <Routes>
                    {!wallet_id && <Route path="/" element={<Login />} />}
                <Route element={<Layout />}>
                    {wallet_id && <Route path="/" element={<Community />} />}
                    {wallet_id && <Route path="/create" element={<Create />} />}
                    {wallet_id && <Route path="/notifications" element={<Notifications />} />}
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}