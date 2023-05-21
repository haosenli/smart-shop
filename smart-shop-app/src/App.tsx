import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import Help from "./pages/Help";

function App() {
    // Page navigation
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate("/");
    };
    const navigateToShoppingCart = () => {
        navigate("/cart");
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
                        navigateToHelp={navigateToHelpHome}
                    />
                }
            />
            <Route
                path="/cart"
                element={
                    <ShoppingCart
                        cartUrl={url}
                        navigateToHome={navigateToHome}
                        navigateToHelp={navigateToHelpCart}
                        navigateToCheckout={navigateToCheckout}
                    />
                }
            />
            <Route
                path="/checkout"
                element={<Checkout navigateToHome={navigateToHome} />}
            />
            <Route
                path="/help-home"
                element={<Help navigateBack={navigateToHome} />}
            />
            <Route
                path="/help-cart"
                element={<Help navigateBack={navigateToShoppingCart} />}
            />
        </Routes>
    );
}

export default App;
