import React, { useRef } from "react";
import CSS from "csstype";
import { QrReader } from "react-qr-reader";

interface State {
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    navigateToShoppingCart: () => void;
    baseUrl: string;
}

function QrScanner({ setUrl, navigateToShoppingCart, baseUrl }: State) {
    const closeCam = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        });
        // the rest of the cleanup code
        window.location.reload();
    };

    return (
        <QrReader
            onResult={(result, error) => {
                if (!!result) {
                    let qrResult: string = result.getText();
                    if (qrResult.includes(baseUrl)) {
                        setUrl(result.getText());
                        closeCam();
                        navigateToShoppingCart();
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
    transform: "scale(1.4)",
    objectFit: "cover",
};

export default QrScanner;
