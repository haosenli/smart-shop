#!/usr/bin/env python3
import serial
import serial.tools.list_ports
import json
import traceback
import RPi.GPIO as GPIO
from multiprocessing import *

import pickle

# Flask imports
from flask import Flask, request
from flask_api import status

# Cart
from cart import Cart
from admin import Admin


STAT_GPIO = 16
REMOVE_FROM_CART = False

# Flask app start up
app = Flask(__name__)


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


def read():
    """
    read the data from a board, if any. If "no device" selected generate random values for demo
    """
    baud = 19200
    try:
        with open("items.json", "r") as f:
            items_file = json.load(f)
    except FileNotFoundError:
        items_file = {}
        print("DUDE THE ITEM DATABASE IS EMPTY")

    port = "/dev/ttyS0"

    controller = serial.Serial(
        port, baudrate=baud
    )  # TODO: sometimes serial port is in use, make it promt user when it happens

    while controller.isOpen():
        try:
            read_data = controller.readline().decode("utf-8").strip()

            if read_data in items_file:
                item = items_file[read_data]
                cart = get_cart()
                if REMOVE_FROM_CART:
                    cart.remove_item(item["item_id"])
                cart.add_item(
                    item["item_id"], item["image_url"], item["item_name"], item["price"]
                )
                save_cart(cart)
                print("READ", cart.view_cart())
        except (KeyboardInterrupt, SystemExit) as e:
            controller.close()
            print(e.__class__.__name__)
            break
        except (json.decoder.JSONDecodeError, UnicodeDecodeError):
            print("decoder error")
        except:
            traceback.print_exc()  # debug, printout error


@app.route("/start", methods=["GET"])
def start():
    global esp

    GPIO.output(STAT_GPIO, GPIO.HIGH)
    if "esp" in globals():  # stop the reader process if it's already running
        esp.terminate()
        # esp.join()
    esp = Process(target=read)
    esp.start()
    return "Threads resumed!", status.HTTP_200_OK


@app.route("/stop", methods=["GET"])
def stop():
    global esp
    GPIO.output(STAT_GPIO, GPIO.LOW)
    if esp.is_alive():
        esp.terminate()
        esp.join()
    cart = get_cart()
    cart.cl()
    save_cart(cart)
    return "Threads stopped.", status.HTTP_200_OK


@app.route("/view-cart", methods=["GET"])
def view_cart():
    cart = get_cart()
    return cart.view_cart(), status.HTTP_200_OK


# Admin
admin = Admin()


@app.route("/admin-cart", methods=["GET"])
def admin_cart():
    admin.add_request("customer need help with cart")


@app.route("/admin-app", methods=["GET"])
def admin_app():
    admin.add_request("customer need help with app")


@app.route("/admin-payment", methods=["GET"])
def admin_payment():
    admin.add_request("customer need help with payment")


@app.route("/admin-help", methods=["GET"])
def admin_get_request():
    return admin.get_request()


@app.route("/remove-items", methods=["POST"])
def remove_items_mode():
    body = request.get_json()
    if admin.validate_employee_id(body):
        REMOVE_FROM_CART = True


@app.route("/add-items", methods=["GET"])
def add_items_mode():
    REMOVE_FROM_CART = False


if __name__ == "__main__":
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(STAT_GPIO, GPIO.OUT)

    app.run(debug=True, port=5555, host="0.0.0.0")
