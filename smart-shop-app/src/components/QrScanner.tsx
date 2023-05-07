import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

function QrScanner() {
    const [data, setData] = useState("No result");

    return (
        <>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result.getText());
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                containerStyle={{ width: "100%" }}
                constraints={{ facingMode: "environment" }}
            />
            <p>{data}</p>
        </>
    );
}

export default QrScanner;
