import styles from "./ShoppingCart.module.css";

interface Props {
    cartUrl: string;
}

function ShoppingCart({ cartUrl }: Props) {
    <main className={styles.shoppingCart}>
        <h1 className={styles.header}>Your cart:</h1>
    </main>;
}

export default ShoppingCart;
