from flask import Blueprint

home_bp = Blueprint('home', __name__)


@home_bp.route('/api/dashboard', methods=['GET'])
def dashboard():
    return {
        "total_products": 120,
        "total_customers": 45,
        "total_bills": 89,
        "revenue": 250000
    }