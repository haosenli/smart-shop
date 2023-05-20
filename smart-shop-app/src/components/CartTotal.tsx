import styles from "./CartTotal.module.css";

interface Props {
    currentItems: number;
    currentPrice: number;
}

function CartTotal({ currentItems, currentPrice }: Props) {
    return (
        <div className={styles.cartTotal}>
            <div>Current Items: {currentItems}</div>
            <div>Price: ${currentPrice}</div>
        </div>
    );
}

export default CartTotal;
