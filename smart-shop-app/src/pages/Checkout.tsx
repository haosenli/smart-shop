import styles from "./Checkout.module.css";
import { useState, useEffect } from "react";
import ButtonLink from "../components/ButtonLink";

interface Props {
    navigateToHome: () => void;
}

function Checkout({ navigateToHome }: Props) {
    const [timeLeft, setTimeLeft] = useState(3);
    useEffect(() => {
        const timer = setTimeout(() => {
            // Code to be executed after 3 seconds
            navigateToHome();
        }, 3000);

        return () => {
            clearTimeout(timer); // Clean up the timer if the component unmounts before the 3 seconds
        };
    }, []);

    return (
        <main className={styles.checkout}>
            <h1 className={styles.header}>Checkout Successful!</h1>
            <img
                className={styles.completeImage}
                src="https://media.tenor.com/oOJnZc8KgusAAAAC/freedom-free.gif"
            />
            <ButtonLink
                buttonText={`Return Home`}
                backgroundColor="#6656e2"
                textColor="white"
                textSize="1.25rem"
                padding="0.75rem"
                navigateTo={navigateToHome}
            />
        </main>
    );
}

export default Checkout;
