import styles from "./CartItems.module.css";
import CartItem from "./CartItem";

interface Item {
    image_url: string;
    item: string;
    price: number;
}

interface Props {
    itemsList: Item[];
}

function CartItems({ itemsList }: Props) {
    return (
        <div className={styles.cartItems}>
            {itemsList.map((item, index) => (
                <CartItem
                    key={index}
                    image_url={item.image_url}
                    item={item.item}
                    price={item.price}
                />
            ))}
        </div>
    );
}

export default CartItems;
