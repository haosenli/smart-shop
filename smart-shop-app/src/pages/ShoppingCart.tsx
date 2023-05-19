import styles from "./ShoppingCart.module.css";

import { useState } from "react";

import CartTotal from "../components/CartTotal";
import CartItems from "../components/CartItems";

interface Props {
    cartUrl: string;
    navigateToHome: () => void;
}

interface Item {
    imageUrl: string;
    itemName: string;
    price: string;
}

function ShoppingCart({ cartUrl, navigateToHome }: Props) {
    const [currentItems, setItems] = useState(0);
    const [currentPrice, setPrice] = useState(0.0);
    const [itemsList, setItemsList] = useState<Item[]>([]);
    return (
        <main className={styles.shoppingCart}>
            <h1 className={styles.header}>Your cart:</h1>
            <CartTotal
                currentItems={currentItems}
                currentPrice={currentPrice}
            />
            <CartItems itemsList={itemsList} />
        </main>
    );
}

export default ShoppingCart;
