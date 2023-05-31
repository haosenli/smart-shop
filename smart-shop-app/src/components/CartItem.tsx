import styles from "./CartItem.module.css";

interface Props {
    image_url: string;
    item: string;
    price: number;
}

function CartItem({ image_url, item, price }: Props) {
    return (
        <div className={styles.cartItem}>
            <img className={styles.imageUrl} src={image_url} />
            <div className={styles.itemName}>{item}</div>
            <div className={styles.price}>${price}</div>
        </div>
    );
}

export default CartItem;
