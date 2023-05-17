interface Props {
    currentItems: number;
    currentPrice: number;
}

function CartTotal({ currentItems, currentPrice }: Props) {
    return (
        <div>
            <span>Current Items: {currentItems}</span>
            <span>Price: ${currentPrice}</span>
        </div>
    );
}
