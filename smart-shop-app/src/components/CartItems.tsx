interface Item {
    imageUrl: string;
    itemName: string;
    price: string;
}

interface Props {
    itemsList: Item[];
}

function CartItems({ itemsList }: Props) {
    return <div></div>;
}

export default CartItems;
