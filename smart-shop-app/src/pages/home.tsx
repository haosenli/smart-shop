import CSS from "csstype";
import QrScanner from "../components/QrScanner";
import ButtonLink from "../components/ButtonLink";

interface Props {
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    navigateToSetting: () => void;
}

function Home({ setUrl, navigateToSetting }: Props) {
    return (
        <main style={homeStyle}>
            <h1 style={h1Style}>Please scan the shopping cart's QR code.</h1>
            <div style={scannerStyle}>
                <QrScanner setUrl={setUrl} baseUrl="http://127.0.0.1:5000" />
            </div>
            <nav style={navStyle}>
                <ButtonLink
                    buttonText="Ask for Help"
                    backgroundColor="white"
                    textColor="black"
                    navigateTo={navigateToSetting}
                />
                <ButtonLink
                    buttonText="Settings"
                    backgroundColor="white"
                    textColor="black"
                    navigateTo={navigateToSetting}
                />
            </nav>
            <p>{url}</p>
        </main>
    );
}

const homeStyle: CSS.Properties = {
    paddingTop: "10vh",
    paddingLeft: "7.5vw",
    paddingRight: "7.5vw",
    minHeight: "90vh",
    background: "black",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "2.1rem",
};

const h1Style: CSS.Properties = {
    color: "white",
    margin: "0",
    fontSize: "1.6rem",
};

const scannerStyle: CSS.Properties = {
    borderRadius: "1rem",
    maxWidth: "100%",
    aspectRatio: "1/1",
    overflow: "hidden",
};

const navStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
};

export default Home;
