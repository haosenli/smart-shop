import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import Help from "./pages/Help";

function App() {
    // Page navigation
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/home");
    };
    const navigateToShoppingCart = () => {
        navigate("/");
    };
    const navigateToHelpHome = () => {
        navigate("/help-home");
    };
    const navigateToHelpCart = () => {
        navigate("/help-cart");
    };
    const navigateToCheckout = () => {
        navigate("/checkout");
    };

    // React hooks
    const [url, setUrl] = useState("http://10.19.89.248:5000");

    return (
        <Routes>
            <Route
                path="/home"
                element={
                    <Home
                        url={url}
                        setUrl={setUrl}
                        navigateToShoppingCart={navigateToShoppingCart}
                        navigateToHelp={navigateToHelpHome}
                    />
                }
            />
            <Route
                path="/"
                element={
                    <ShoppingCart
                        cartUrl={url}
                        navigateToHelp={navigateToHelpCart}
                        navigateToCheckout={navigateToCheckout}
                    />
                }
            />
            <Route
                path="/checkout"
                element={<Checkout navigateToHome={navigateToShoppingCart} />}
            />
            <Route
                path="/help-home"
                element={<Help cartUrl={url} navigateBack={navigateToHome} />}
            />
            <Route
                path="/help-cart"
                element={
                    <Help cartUrl={url} navigateBack={navigateToShoppingCart} />
                }
            />
        </Routes>
    );
}

export default App;
