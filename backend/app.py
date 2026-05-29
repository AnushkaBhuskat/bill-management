from flask import Flask
from flask_cors import CORS

from routes.customer_routes import customer_bp
from routes.products_routes import product_bp
from routes.billing_routes import bill_bp
from routes.invoice_routes import invoice_bp
from routes.home_routes import home_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(customer_bp)
app.register_blueprint(product_bp)
app.register_blueprint(bill_bp)
app.register_blueprint(invoice_bp)
app.register_blueprint(home_bp)


@app.route('/')
def home():
    return {
        "message": "Bill Management Backend Running"
    }


if __name__ == '__main__':
    app.run(debug=True)