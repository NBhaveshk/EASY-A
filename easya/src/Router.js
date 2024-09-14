import { BrowserRouter, Routes, Route } from "react-router-dom"
import Community from "./pages/Community"
import Layout from "./Layout"
import Login from "./pages/Login"
import Notifications from "./pages/Notifications"
import { useAuth } from "./Context"

export default function Router() {
    const { wallet_id } = useAuth()

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    {!wallet_id && <Route path="/" element={<Login />} />}
                    {wallet_id && <Route path="/" element={<Community />} />}
                    {wallet_id && <Route path="/create" element={<h1>Create</h1>} />}
                    {wallet_id && <Route path="/notifications" element={<Notifications />} />}
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}