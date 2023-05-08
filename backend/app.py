from flask import (
    Flask,
)

# Flask app start up
app: Flask = Flask(__name__)


# Routes
@app.route("/", methods=["GET"])
def home():
    """Returns home page"""
    return "Hello world"


if __name__ == "__main__":
    app.run(debug=True, port=5000)
