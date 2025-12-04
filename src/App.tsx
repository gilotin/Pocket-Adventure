import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./app/pages/Home/HomePage";
import { Layout } from "./components/layout/Layout";

function App() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    );
}

export default App;
