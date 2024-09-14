import { BrowserRouter, Routes, Route } from "react-router-dom"
import Community from "./pages/Community"
import Layout from "./Layout"
import WalletConnect from "./components/WalletConnect"
import Notifications from "./pages/Notifications"
import { useAuth } from "./Context"

export default function Router() {
    const { wallet_id } = useAuth()

    console.log(!wallet_id)

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    {!wallet_id && <Route path="/" element={<WalletConnect />} />}
                    {wallet_id && <Route path="/" element={<Community />} />}
                    {wallet_id && <Route path="/create" element={<h1>Create</h1>} />}
                    {wallet_id && <Route path="/notifications" element={<Notifications />} />}
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}