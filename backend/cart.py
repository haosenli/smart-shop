class Cart:
    def __init__(self) -> None:
        self.cart_content: list = []
        self.valid_employees: set = set()

    def add_item(self, item_id: str, image_url: str, item: str, price: float) -> None:
        # add item with qty 0 to cart
        self.cart_content.append(
            {
                "item_id": item_id,
                "image_url": image_url,
                "item": item,
                "price": price,
            }
        )

    def remove_item(self, item_id: str, employee_id: str) -> None:
        # check if item_id exist in cart
        if employee_id not in self.valid_employees:
            pass

        # if item is inside of cart
        if item_id in self.cart_content:
            for d, i in enumerate(self.cart_content):
                if d["item_id"] == item_id:
                    self.cart_content.pop(i)

    def view_cart(self) -> dict:
        return self.cart_content
