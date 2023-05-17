#!/usr/bin/env python3
import argparse
import serial
import serial.tools.list_ports
import json
import traceback
import RPi.GPIO as GPIO
from threading import Thread
from queue import Queue

from cart import Cart

# Constants
BAUD = 19200
STAT_GPIO = 16
CART = Cart()

# global variable to indicate whether process_item_id should continue running
continue_processing = True

# TODO: Make this global instead
try:
    with open("items.json", "r") as f:
        ITEMS = json.load(f)
except FileNotFoundError:
    ITEMS = {}
    print("DUDE THE ITEM DATABASE IS EMPTY")


def read_from_esp_board(q):
    global continue_processing
    baud = BAUD

    controller = serial.Serial("/dev/ttyS0", baudrate=baud)

    while controller.isOpen():
        try:
            item_id = controller.readline().decode("utf-8").strip()
            if continue_processing:
                q.put(item_id)
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


def process_item_id(q, mode="X"):
    # TODO: for actual app, instead print the upc/item code store them to .json file
    global continue_processing
    while True:
        if continue_processing:
            item_id = q.get()
            # Customer mode
            if mode == "X":
                # use the read item_id to check if is in the json keys
                if item_id in ITEMS:
                    CART.add_item(item_id, image_url, item_name, price)
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

                with open("item_id.json", "w") as f:
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


def run_program():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(STAT_GPIO, GPIO.OUT)
    q = Queue()

    # create and start threads for reading and processing item_id from esp board
    read_thread = Thread(target=read_from_esp_board, args=(q,))
    read_thread.start()

    process_thread = Thread(target=process_item_id, args=(q,))
    process_thread.start()


if __name__ == "__main__":
    # X: read item_id from esp board and process it
    # Y: read item_id from esp board and save it to a file

    # parser = argparse.ArgumentParser()
    # parser.add_argument("-m", "--mode", choices=["X", "Y"], required=True)
    # args = parser.parse_args()
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(STAT_GPIO, GPIO.OUT)
    q = Queue()

    # create and start threads for reading and processing item_id from esp board
    read_thread = Thread(target=read_from_esp_board, args=(q,))
    read_thread.start()

    process_thread = Thread(target=process_item_id, args=(q,))
    process_thread.start()

    # main_thread = Thread(target=user_input, args=(q,))
    # main_thread.start()

    # GPIO.output(STAT_GPIO, GPIO.LOW)
