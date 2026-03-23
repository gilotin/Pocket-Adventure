import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./app/pages/home/HomePage";
import { MainLayout } from "./app/pages/home/layout/HomeLayout";
import { GameLayout } from "./app/pages/pocketAdventureGame/layout/GameLayout";

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
