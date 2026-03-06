import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./app/pages/Home/HomePage";
import { MainLayout } from "./components/layout/MainLayout";
import { GameLayout } from "./app/pages/PocketAdventureGame/layout/GameLayout";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                    <Route path="/game" element={<GameLayout />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
