from flask import Flask
from flask_cors import CORS

from routes.customer_routes import customer_bp
from routes.billing_routes import billing_bp
from routes.invoice_routes import invoice_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(customer_bp)
app.register_blueprint(billing_bp)
app.register_blueprint(invoice_bp)

@app.route('/')
def home():
    return {
        "message": "Flask Backend Running"
    }

if __name__ == '__main__':
    app.run(debug=True)