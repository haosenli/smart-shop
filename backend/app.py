from flask import Flask
from flask_api import status

# from cart import Cart
from rfid_reader import *


# Flask app start up
app: Flask = Flask(__name__)

@app.route('/start', methods=['GET'])
def start():
    global continue_processing
    continue_processing = True
    GPIO.output(STAT_GPIO, GPIO.HIGH)
    print("Threads resumed.")
    return "Threads resumed!", status.HTTP_200_OK

# TODO: add a way to clear item from a shopping cart when stopped
@app.route('/stop', methods=['GET'])
def stop():
    stop_processing()
    print("Threads stopped.")
    return "Threads stopped.", status.HTTP_200_OK
    

@app.route("/view-cart", methods=["GET"])
def view_cart() -> dict:
    return CART.cart_content, status.HTTP_200_OK


if __name__ == "__main__":
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(STAT_GPIO, GPIO.OUT)
    q = Queue()

    # create and start threads for reading and processing item_id from esp board
    read_thread = Thread(target=read_from_esp_board, args=(q,))
    read_thread.start()

    process_thread = Thread(target=process_item_id, args=(q, 'X',))
    process_thread.start()

    # TODO: add option to read from a config.json
    app.run(debug=True, port=5000, host="0.0.0.0")
