import { BrowserRouter, Routes, Route } from "react-router-dom"
import Community from "./pages/Community"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Community />} />
            </Routes>
        </BrowserRouter>
    )
}