import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
    // Page navigation
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/");
    };
    const navigateToShoppingCart = () => {
        navigate("/cart");
    };
    const navigateToHelp = () => {
        navigate("/");
    };
    const navigateToSetting = () => {
        navigate("/");
    };

    // React hooks
    const [url, setUrl] = useState("");

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        url={url}
                        setUrl={setUrl}
                        navigateToShoppingCart={navigateToShoppingCart}
                        navigateToHelp={navigateToHelp}
                        navigateToSetting={navigateToSetting}
                    />
                }
            />
            <Route
                path="/cart"
                element={
                    <ShoppingCart
                        cartUrl={url}
                        navigateToHome={navigateToHome}
                    />
                }
            />
        </Routes>
    );
}

export default App;
