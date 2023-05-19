import styles from "./Home.module.css";
import QrScanner from "../components/QrScanner";
import ButtonLink from "../components/ButtonLink";

interface Props {
    url: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    navigateToShoppingCart: () => void;
    navigateToHelp: () => void;
    navigateToSetting: () => void;
}

function Home({
    url,
    setUrl,
    navigateToShoppingCart,
    navigateToHelp,
    navigateToSetting,
}: Props) {
    return (
        <main className={styles.home}>
            <h1 className={styles.header}>
                Please scan the shopping cart's QR code.
            </h1>
            <div className={styles.scannerContainer}>
                {/* Replace this with Raspberry Pi's address */}
                {url ? (
                    <></>
                ) : (
                    <QrScanner
                        setUrl={setUrl}
                        navigateToShoppingCart={navigateToShoppingCart}
                        baseUrl="localhost:5000"
                    />
                )}
            </div>
            <nav className={styles.navContainer}>
                <ButtonLink
                    buttonText="Ask for Help"
                    backgroundColor="white"
                    textColor="black"
                    navigateTo={navigateToHelp}
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
