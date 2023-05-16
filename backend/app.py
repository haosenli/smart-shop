from flask import Flask
from flask_api import status

from cart import Cart
from rfid_reader import run_program


run_program()
CART: Cart = Cart()

# Flask app start up
app: Flask = Flask(__name__)


@app.route("/view-cart", methods=["GET"])
def view_cart() -> dict:
    return CART.view_cart(), status.HTTP_200_OK


if __name__ == "__main__":
    app.run(debug=True, port=5000)
