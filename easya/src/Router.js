import { BrowserRouter, Routes, Route } from "react-router-dom"
import Community from "./pages/Community"
import WalletConnect from "./pages/WalletConnect"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<WalletConnect />} />
                <Route path="*" element={<Community />} />
            </Routes>
        </BrowserRouter>
    )
}