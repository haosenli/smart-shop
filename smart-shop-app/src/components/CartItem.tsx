import styles from "./CartItem.module.css";

interface Props {
    id: string;
    imageUrl: string;
    itemName: string;
    price: number;
    qty: number;
}

function CartItem({ imageUrl, itemName, price, qty }: Props) {
    return (
        <div className={styles.cartItem}>
            <img className={styles.imageUrl} src={imageUrl} />
            <div className={styles.itemName}>{itemName}</div>
            <div className={styles.price}>${price}</div>
            <div className={styles.qty}>{qty}</div>
        </div>
    );
}

export default CartItem;
