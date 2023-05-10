import React, { useState } from "react";
import CSS from "csstype";
import { QrReader } from "react-qr-reader";

interface State {
    setData: React.Dispatch<React.SetStateAction<string>>;
}

function QrScanner({ setData }: State) {
    return (
        <QrReader
            onResult={(result, error) => {
                if (!!result) {
                    setData(result.getText());
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
    objectFit: "cover",
};

export default QrScanner;
