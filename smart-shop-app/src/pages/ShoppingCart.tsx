import styles from "./ShoppingCart.module.css";

import { useState, useEffect } from "react";
// import fetch from "node-fetch";

import CartItems from "../components/CartItems";
import ButtonLink from "../components/ButtonLink";
import NavIcon from "../components/NavIcon";

interface Props {
    cartUrl: string;
    navigateToHelp: () => void;
    navigateToCheckout: () => void;
}

interface Item {
    image_url: string;
    item: string;
    price: number;
}

function ShoppingCart({ cartUrl, navigateToHelp, navigateToCheckout }: Props) {
    const [currentItems, setItems] = useState(0);
    const [currentPrice, setPrice] = useState("0.00");
    const [itemsList, setItemsList] = useState<Item[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`${cartUrl}/start`, {
                mode: "no-cors",
            });
        };
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    useEffect(() => {
        let json: Item[] = [];
        const fetchItems = async () => {
            const data = await fetch(`${cartUrl}/view-cart`);
            // convert the data to json
            json = await data.json();

            // set state with the result
            setItemsList(json);
        };
        const interval = setInterval(() => {
            // call the function
            fetchItems()
                // make sure to catch any error
                .catch(console.error);
            // send get request for cart content
            const totalPrice = json.reduce(
                (total, item) => total + item.price,
                0
            );
            const roundedTotalPrice = totalPrice.toFixed(2);
            setPrice(roundedTotalPrice);
            setItems(json.length);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <main className={styles.shoppingCart}>
            <div className={styles.navIcons}>
                <NavIcon src={"home.svg"} size={"2.65rem"} onClick={() => {}} />
                <NavIcon
                    src={"support.svg"}
                    size={"2.65rem"}
                    onClick={async () => {
                        // send request to backend
                        await fetch(`${cartUrl}/admin-cart`);
                    }}
                />
            </div>
            <h1 className={styles.header}>Your cart</h1>
            <CartItems itemsList={itemsList} />
            <ButtonLink
                buttonText={`Checkout (${currentItems}) - $${currentPrice}`}
                backgroundColor="#6656e2"
                textColor="white"
                textSize="1.25rem"
                padding="0.75rem"
                navigateTo={navigateToCheckout}
            />
        </main>
    );
}

export default ShoppingCart;
