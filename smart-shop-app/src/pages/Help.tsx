import styles from "./Help.module.css";

import ButtonLink from "../components/ButtonLink";
import NavIcon from "../components/NavIcon";

interface Props {
    navigateBack: () => void;
}

function Help({ navigateBack }: Props) {
    return (
        <main className={styles.help}>
            <h1 className={styles.header}>Contact for Help</h1>

            <nav className={styles.navContainer}>
                <ButtonLink
                    buttonText={`Need help with cart`}
                    backgroundColor="#6656e2"
                    textColor="white"
                    textSize="1.25rem"
                    padding="0.75rem"
                    navigateTo={() => {
                        // send request to backend
                        return;
                    }}
                />
                <ButtonLink
                    buttonText={`Need help with app`}
                    backgroundColor="#6656e2"
                    textColor="white"
                    textSize="1.25rem"
                    padding="0.75rem"
                    navigateTo={() => {
                        return;
                    }}
                />
                <ButtonLink
                    buttonText={`Need help with payment`}
                    backgroundColor="#6656e2"
                    textColor="white"
                    textSize="1.25rem"
                    padding="0.75rem"
                    navigateTo={() => {
                        return;
                    }}
                />
            </nav>

            <div className={styles.navIcons}>
                <NavIcon
                    src={"back.svg"}
                    size={"2.65rem"}
                    onClick={navigateBack}
                />
            </div>
        </main>
    );
}

export default Help;
