// import ListGroup from "./components/ListGroup";
// import Alert from "./components/Alert";
// import Button from "./components/Button";
// import { useState } from "react";
import Home from "./pages/home";

function App() {
    // const [alertActive, setAlertActive] = useState(false);

    return (
        <Home />
        // <div>
        //     {alertActive && (
        //         <Alert
        //             onClick={() => {
        //                 setAlertActive(false);
        //             }}
        //         >
        //             Hello World
        //         </Alert>
        //     )}
        //     <Button
        //         children="My Button"
        //         color="primary"
        //         onClick={() => {
        //             setAlertActive(true);
        //         }}
        //     />
        // </div>
    );
}

export default App;
