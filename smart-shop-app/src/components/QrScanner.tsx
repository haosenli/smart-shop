import React, { useRef } from "react";
import CSS from "csstype";
import { QrReader } from "react-qr-reader";

interface State {
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    navigateToShoppingCart: () => void;
    baseUrl: string;
}

function QrScanner({ setUrl, navigateToShoppingCart, baseUrl }: State) {
    const ref = useRef(null);

    const closeCam = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        });
        stream.getTracks().forEach(function (track) {
            track.stop();
            track.enabled = false;
        });
        ref.current.stopCamera();
    };

    return (
        <QrReader
            onResult={(result, error) => {
                if (!!result) {
                    let qrResult: string = result.getText();
                    if (qrResult.includes(baseUrl)) {
                        setUrl(result.getText());
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
