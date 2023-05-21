import styles from "./CartItem.module.css";

interface Props {
    imageUrl: string;
    itemName: string;
    price: number;
}

function CartItem({ imageUrl, itemName, price }: Props) {
    return (
        <div className={styles.cartItem}>
            <img className={styles.imageUrl} src={imageUrl} />
            <div className={styles.itemName}>{itemName}</div>
            <div className={styles.price}>${price}</div>
        </div>
    );
}

export default CartItem;
