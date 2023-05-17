import styles from "./Home.module.css";
import QrScanner from "../components/QrScanner";
import ButtonLink from "../components/ButtonLink";

interface Props {
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    navigateToSetting: () => void;
}

function Home({ setUrl, navigateToSetting }: Props) {
    return (
        <main className={styles.home}>
            <h1 className={styles.header}>
                Please scan the shopping cart's QR code.
            </h1>
            <div className={styles.scannerContainer}>
                {/* Replace this with Raspberry Pi's address */}
                <QrScanner setUrl={setUrl} baseUrl="http://localhost:5000" />
            </div>
            <nav className={styles.navContainer}>
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
        </main>
    );
}

export default Home;
