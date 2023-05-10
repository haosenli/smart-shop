from flask import Flask
from flask_api import status

# Flask app start up
app: Flask = Flask(__name__)


# Routes
@app.route("/", methods=["GET"])
def home():
    """Returns home page"""

    return "Hello world", 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
