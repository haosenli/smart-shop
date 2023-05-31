import pickle
from cart import Cart


def get_cart():
    try:
        with open("cart.pkl", "rb") as f:
            cart = pickle.load(f)
    except FileNotFoundError:
        cart = Cart()
        save_cart(cart)
    return cart


def save_cart(cart):
    with open("cart.pkl", "wb") as f:
        pickle.dump(cart, f)


cart = get_cart()

cart.add_item(
    "1",
    "https://moodle.com/wp-content/uploads/2021/06/22087-11.jpg",
    "Black T-Shirt",
    29.99,
)
cart.add_item(
    "2",
    "https://assets.burberry.com/is/image/Burberryltd/46195D47-1EB6-4BB8-8129-AAA2894761FD?$BBY_V2_SL_1x1$&wid=2500&hei=2500",
    "White T-Shirt",
    49.99,
)
cart.add_item(
    "3",
    "https://lsco.scene7.com/is/image/lsco/563270086-alt1-pdp-lse?$laydownfront$",
    "Denim Shorts",
    39.99,
)
cart.add_item(
    "2",
    "https://assets.burberry.com/is/image/Burberryltd/46195D47-1EB6-4BB8-8129-AAA2894761FD?$BBY_V2_SL_1x1$&wid=2500&hei=2500",
    "White T-Shirt",
    49.99,
)
cart.add_item(
    "4",
    "https://cdn.shopify.com/s/files/1/0518/5568/7845/products/Theodor_Leather_Sneaker-Shoes-LDM801022-201201-White.jpg?v=1669885495",
    "Shoe",
    59.99,
)

print("items in cart:")
[print(f"{d}\n") for d in cart.view_cart()]

save_cart(cart)
