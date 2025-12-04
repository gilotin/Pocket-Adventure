import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./app/pages/Home/HomePage";
import { MainLayout } from "./components/layout/MainLayout";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Landing page layout */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
