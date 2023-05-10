import React, { useState } from "react";
import QrScanner from "../components/QrScanner";

function Home() {
    const [data, setData] = useState("No result");
    return (
        <>
            <QrScanner setData={setData} />
            <p>{data}</p>
        </>
    );
}

export default Home;
