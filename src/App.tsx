import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./app/pages/Home/HomePage";
import { MainLayout } from "./components/layout/MainLayout";
import { PocketAdventurePage } from "./app/pages/PocketAdventureGame/PocketAdventurePage";
import { GameLayout } from "./app/pages/PocketAdventureGame/layout/GameLayout";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Landing page layout */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                    <Route path="/game" element={<GameLayout />}>
                        <Route index element={<PocketAdventurePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
