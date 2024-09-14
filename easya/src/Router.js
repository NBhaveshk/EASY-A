import { BrowserRouter, Routes, Route } from "react-router-dom"
import Community from "./pages/Community"
import Layout from "./Layout"
import WalletConnect from "./pages/WalletConnect"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Community />} />
                    <Route path="/login" element={<WalletConnect />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}