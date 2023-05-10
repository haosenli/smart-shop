import React, { useState } from "react";
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
            containerStyle={{ width: "100%", height: "100%" }}
            constraints={{ facingMode: "environment" }}
        />
    );
}

export default QrScanner;
