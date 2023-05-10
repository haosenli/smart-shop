import React, { useState } from "react";
import CSS from "csstype";
import QrScanner from "../components/QrScanner";

function Home() {
    const [data, setData] = useState("No result");
    return (
        <main style={homeStyle}>
            <div style={scannerStyle}>
                <QrScanner setData={setData} />
            </div>
            <p>{data}</p>
        </main>
    );
}

const homeStyle: CSS.Properties = {
    minHeight: "100vh",
    background: "black",
};

const scannerStyle: CSS.Properties = {
    paddingTop: "10vh",
    padding: "10vw",
    borderRadius: "6rem",
};

export default Home;
