
from flask import Flask
from flask_cors import CORS

# =========================
# IMPORT ROUTES
# =========================

from routes.customer_routes import customer_bp
from routes.products_routes import product_bp
from routes.billing_routes import bill_bp
from routes.invoice_routes import invoice_bp
from routes.home_routes import home_bp


# =========================
# CREATE FLASK APP
# =========================

app = Flask(__name__)


# =========================
# ENABLE CORS
# =========================

CORS(app)


# =========================
# REGISTER BLUEPRINTS
# =========================

app.register_blueprint(customer_bp)
app.register_blueprint(product_bp)
app.register_blueprint(bill_bp)
app.register_blueprint(invoice_bp)
app.register_blueprint(home_bp)


# =========================
# MAIN ROUTE
# =========================

@app.route('/')
def home():

    return {
        "status": "success",
 }


# =========================
# START SERVER
# =========================

if __name__ == '__main__':

    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
