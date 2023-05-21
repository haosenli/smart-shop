import styles from "./CartTotal.module.css";

interface Props {
    currentItems: number;
    currentPrice: string;
}

function CartTotal({ currentItems, currentPrice }: Props) {
    return (
        <div className={styles.cartTotal}>
            <div>Items: {currentItems}</div>
            <div>Total: ${currentPrice}</div>
        </div>
    );
}

export default CartTotal;
