import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import LogIn from "./pages/LogIn";

function App() {
    const [url, setUrl] = useState("No result");
    const navigate = useNavigate();
    const navigateToHelp = () => {
        navigate("/");
    };
    const navigateToSetting = () => {
        navigate("/login");
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
            <Route path="/login/" element={<LogIn />} />
        </Routes>
    );
}

export default App;
