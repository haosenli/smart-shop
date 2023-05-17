class Cart:
    def init(self) -> None:
        self.cart_content: dict = {}
        self.valid_employees: set = set()

    def add_item(self, item_id: int, image_url: str, item: str, price: float) -> None:
        # Check if item_id does not exist in cart
        if item_id not in self.cart_content:
            # add item with qty 0 to cart
            self.cart_content[item_id] = {
                "image_url": image_url,
                "item": item,
                "qty": 0,
                "price": price,
            }
        # Increment qty of item
        self.cart_content[item_id]["price"] += 1

    def remove_item(self, item_id: str, employee_id: str) -> None:
        # check if item_id exist in cart
        if employee_id not in self.valid_employees:
            pass

        # if item is inside of cart
        if item_id in self.cart_content:
            # remove qty of item by 1
            self.cart_content[item_id]["qty"] -= 1

    def view_cart(self) -> dict:
        return self.cart_content
