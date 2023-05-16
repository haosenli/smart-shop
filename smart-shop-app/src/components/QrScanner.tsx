import React, { useState } from "react";
import CSS from "csstype";
import { QrReader } from "react-qr-reader";

interface State {
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    baseUrl: string;
}

function QrScanner({ setUrl, baseUrl }: State) {
    return (
        <QrReader
            onResult={(result, error) => {
                if (!!result) {
                    let qrResult: string = result.getText();
                    if (qrResult.includes(baseUrl)) {
                        setUrl(result.getText());
                    }
                }

                if (!!error) {
                    console.info(error);
                }
            }}
            containerStyle={videoStyle}
            constraints={{ facingMode: "environment" }}
        />
    );
}

const videoStyle: CSS.Properties = {
    width: "100%",
    height: "100%",
    transform: "scale(1.35)",
    objectFit: "cover",
};

export default QrScanner;
