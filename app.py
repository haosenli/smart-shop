#!/usr/bin/env python3
import argparse
import serial
import os
import serial.tools.list_ports
import json
import traceback
import RPi.GPIO as GPIO
from threading import Thread
from queue import Queue

from cart import Cart
from flask import Flask
from flask_api import status

# Constants
BAUD = 19200
STAT_GPIO = 16

# Global variables
continue_processing = True
Q: Queue = Queue()
CART: Cart = Cart()
ITEMS: dict = {}

items_path = os.path.join(os.getcwd(), "items.json")
with open(items_path, "r") as f:
    ITEMS = json.load(f)

if not ITEMS:
    print("BRO ITEMS IS EMPTY, CANT SCAN ANYTHING")


def read_from_esp_board(q):
    global continue_processing
    baud = BAUD

    controller = serial.Serial("/dev/ttyS0", baudrate=baud)

    while controller.isOpen():
        try:
            data = controller.readline().decode("utf-8").strip()
            if continue_processing:
                q.put(data)
        except UnicodeDecodeError:
            pass
        except KeyboardInterrupt:
            controller.close()
            print("\nKeyboardInterrupt")
            break
        except serial.serialutil.SerialException:
            controller.close()
            print("Device disconnected!")
            break
        except:
            traceback.print_exc()


def process_data(q, mode):
    # TODO: for actual app, instead print the upc/item code store them to .json file
    global continue_processing
    while True:
        if continue_processing:
            item_id = q.get()
            if mode == "X":
                # use the read item_id to check if is in the json keys
                if item_id in ITEMS:
                    item = ITEMS[item_id]
                    CART.add_item(
                        item["item_id"],
                        item["image_url"],
                        item["item_name"],
                        item["price"],
                    )
                    print(CART.view_cart())
            # Retailer mode
            elif mode == "Y":
                item_name = input("Enter the item name: ")
                price = input("Enter a price for the item: ")
                image_url = input("Enter an item image url: ")

                try:
                    with open("items.json", "r") as f:
                        existing_item_id = json.load(f)
                except FileNotFoundError:
                    existing_item_id = {}

                existing_item_id[item_id] = {
                    "item_id": item_id,
                    "item_name": item_name,
                    "price": price,
                    "image_url": image_url,
                }

                with open("items.json", "w") as f:
                    json.dump(existing_item_id, f)


def stop_processing():
    global continue_processing
    GPIO.output(STAT_GPIO, GPIO.LOW)
    continue_processing = False


def user_input(q):
    global continue_processing
    while True:
        # TODO: on the actual app, programically start and stop this instead using terminal to do so
        print("Enter 's' to stop, 'r' to resume: ")
        user_in = input()
        if user_in == "s":
            stop_processing()
            print("Threads stopped.")
        elif user_in == "r":
            continue_processing = True
            GPIO.output(STAT_GPIO, GPIO.HIGH)
            print("Threads resumed.")
        else:
            print("Invalid input. Please try again.")


# X: read data from esp board and process it
# Y: read data from esp board and save it to a file
GPIO.setmode(GPIO.BCM)
GPIO.setup(STAT_GPIO, GPIO.OUT)

# create and start threads for reading and processing data from esp board
read_thread = Thread(target=read_from_esp_board, args=(Q,))
read_thread.start()

process_thread = Thread(target=process_data, args=(Q, "X"))
process_thread.start()

# GPIO.output(STAT_GPIO, GPIO.LOW)

# Flask app start up
app: Flask = Flask(__name__)


@app.route("/view-cart", methods=["GET"])
def view_cart() -> dict:
    return CART.view_cart(), status.HTTP_200_OK


if __name__ == "__main__":
    app.run(debug=True, port=5000)
