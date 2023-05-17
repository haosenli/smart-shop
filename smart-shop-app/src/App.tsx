import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";

function App() {
    const [url, setUrl] = useState("No result");
    const navigate = useNavigate();
    const navigateToHelp = () => {
        navigate("/");
    };
    const navigateToSetting = () => {
        navigate("/");
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        setUrl={setUrl}
                        navigateToSetting={navigateToSetting}
                    />
                }
            />
        </Routes>
    );
}

export default App;
