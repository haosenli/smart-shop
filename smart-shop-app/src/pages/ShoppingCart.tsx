import styles from "./ShoppingCart.module.css";

import { useState, useEffect } from "react";

import CartTotal from "../components/CartTotal";
import CartItems from "../components/CartItems";

interface Props {
    cartUrl: string;
    navigateToHome: () => void;
}

interface Item {
    id: string;
    imageUrl: string;
    itemName: string;
    price: number;
    qty: number;
}

function ShoppingCart({ cartUrl, navigateToHome }: Props) {
    const [currentItems, setItems] = useState(0);
    const [currentPrice, setPrice] = useState(0.0);
    const [itemsList, setItemsList] = useState<Item[]>([]);

    const tempItemsList: Item[] = [
        {
            id: "1",
            imageUrl:
                "https://www.collinsdictionary.com/images/full/apple_158989157.jpg",
            itemName: "Apple",
            price: 1,
            qty: 1,
        },
        {
            id: "2",
            imageUrl:
                "https://freshwaysupermarkets.weebly.com/uploads/1/3/2/0/132031192/s218992050954678001_p3_i1_w650.jpeg",
            itemName: "Orange",
            price: 2,
            qty: 2,
        },
        {
            id: "3",
            imageUrl:
                "https://img.imageboss.me/fourwinds/width/425/dpr:2/s/files/1/2336/3219/products/shutterstock_1693201075.png?v=1621966032",
            itemName: "Pear",
            price: 3,
            qty: 3,
        },
        {
            id: "4",
            imageUrl:
                "https://www.verywellfit.com/thmb/qeIiD7JDWsOr4_Ymg4GCaxhhOZs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Bananas-5c6a36a346e0fb0001f0e4a3.jpg",
            itemName: "Orange",
            price: 4,
            qty: 2,
        },
        {
            id: "1",
            imageUrl:
                "https://www.collinsdictionary.com/images/full/apple_158989157.jpg",
            itemName: "Apple",
            price: 1,
            qty: 1,
        },
        {
            id: "2",
            imageUrl:
                "https://freshwaysupermarkets.weebly.com/uploads/1/3/2/0/132031192/s218992050954678001_p3_i1_w650.jpeg",
            itemName: "Orange",
            price: 2,
            qty: 2,
        },
        {
            id: "3",
            imageUrl:
                "https://img.imageboss.me/fourwinds/width/425/dpr:2/s/files/1/2336/3219/products/shutterstock_1693201075.png?v=1621966032",
            itemName: "Pear",
            price: 3,
            qty: 3,
        },
        {
            id: "4",
            imageUrl:
                "https://www.verywellfit.com/thmb/qeIiD7JDWsOr4_Ymg4GCaxhhOZs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Bananas-5c6a36a346e0fb0001f0e4a3.jpg",
            itemName: "Orange",
            price: 4,
            qty: 2,
        },
        {
            id: "1",
            imageUrl:
                "https://www.collinsdictionary.com/images/full/apple_158989157.jpg",
            itemName: "Apple",
            price: 1,
            qty: 1,
        },
        {
            id: "2",
            imageUrl:
                "https://freshwaysupermarkets.weebly.com/uploads/1/3/2/0/132031192/s218992050954678001_p3_i1_w650.jpeg",
            itemName: "Orange",
            price: 2,
            qty: 2,
        },
        {
            id: "3",
            imageUrl:
                "https://img.imageboss.me/fourwinds/width/425/dpr:2/s/files/1/2336/3219/products/shutterstock_1693201075.png?v=1621966032",
            itemName: "Pear",
            price: 3,
            qty: 3,
        },
        {
            id: "4",
            imageUrl:
                "https://www.verywellfit.com/thmb/qeIiD7JDWsOr4_Ymg4GCaxhhOZs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Bananas-5c6a36a346e0fb0001f0e4a3.jpg",
            itemName: "Orange",
            price: 4,
            qty: 2,
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setItemsList(tempItemsList);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <main className={styles.shoppingCart}>
            <h1 className={styles.header}>Your cart:</h1>
            <CartTotal
                currentItems={currentItems}
                currentPrice={currentPrice}
            />
            <div className={styles.description}>
                <span></span>
                <span>Item:</span>
                <span>Price:</span>
                <span>Qty:</span>
            </div>
            <CartItems itemsList={itemsList} />
        </main>
    );
}

export default ShoppingCart;
