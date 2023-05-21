import styles from "./ShoppingCart.module.css";

import { useState, useEffect } from "react";

import CartItems from "../components/CartItems";
import ButtonLink from "../components/ButtonLink";
import NavIcon from "../components/NavIcon";

interface Props {
    cartUrl: string;
    navigateToHome: () => void;
    navigateToHelp: () => void;
    navigateToCheckout: () => void;
}

interface Item {
    id: string;
    imageUrl: string;
    itemName: string;
    price: number;
}

function ShoppingCart({
    cartUrl,
    navigateToHome,
    navigateToHelp,
    navigateToCheckout,
}: Props) {
    const [currentItems, setItems] = useState(0);
    const [currentPrice, setPrice] = useState("0.00");
    const [itemsList, setItemsList] = useState<Item[]>([]);

    const tempItemsList: Item[] = [
        {
            id: "1",
            imageUrl:
                "https://moodle.com/wp-content/uploads/2021/06/22087-11.jpg",
            itemName: "Black T-Shirt",
            price: 29.99,
        },
        {
            id: "2",
            imageUrl:
                "https://assets.burberry.com/is/image/Burberryltd/46195D47-1EB6-4BB8-8129-AAA2894761FD?$BBY_V2_SL_1x1$&wid=2500&hei=2500",
            itemName: "White T-Shirt",
            price: 49.99,
        },
        {
            id: "3",
            imageUrl:
                "https://lsco.scene7.com/is/image/lsco/563270086-alt1-pdp-lse?$laydownfront$",
            itemName: "Denim Shorts",
            price: 39.99,
        },
        {
            id: "4",
            imageUrl:
                "https://cdn.shopify.com/s/files/1/0518/5568/7845/products/Theodor_Leather_Sneaker-Shoes-LDM801022-201201-White.jpg?v=1669885495",
            itemName: "Shoe",
            price: 59.99,
        },
        {
            id: "4",
            imageUrl:
                "https://cdn.shopify.com/s/files/1/0518/5568/7845/products/Theodor_Leather_Sneaker-Shoes-LDM801022-201201-White.jpg?v=1669885495",
            itemName: "Shoe",
            price: 59.99,
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            // send get request for cart content
            setItemsList(tempItemsList);
            const totalPrice = tempItemsList.reduce(
                (total, item) => total + item.price,
                0
            );
            const roundedTotalPrice = totalPrice.toFixed(2);
            setPrice(roundedTotalPrice);
            setItems(tempItemsList.length);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <main className={styles.shoppingCart}>
            <div className={styles.navIcons}>
                <NavIcon
                    src={"home.svg"}
                    size={"2.65rem"}
                    onClick={navigateToHome}
                />
                <NavIcon
                    src={"support.svg"}
                    size={"2.65rem"}
                    onClick={navigateToHelp}
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
