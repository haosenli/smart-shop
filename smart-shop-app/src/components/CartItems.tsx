import styles from "./CartItems.module.css";
import CartItem from "./CartItem";

interface Item {
    id: string;
    imageUrl: string;
    itemName: string;
    price: number;
}

interface Props {
    itemsList: Item[];
}

function CartItems({ itemsList }: Props) {
    return (
        <div className={styles.cartItems}>
            {itemsList.map((item) => (
                <CartItem
                    key={item.id}
                    imageUrl={item.imageUrl}
                    itemName={item.itemName}
                    price={item.price}
                />
            ))}
        </div>
    );
}

export default CartItems;
