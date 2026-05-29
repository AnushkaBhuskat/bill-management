from flask import Blueprint, request, jsonify

customer_bp = Blueprint('customer', __name__)

customers = []

@customer_bp.route('/customers', methods=['GET'])
def get_customers():
    return jsonify(customers)


@customer_bp.route('/add-customer', methods=['POST'])
def add_customer():
    data = request.json

    customers.append(data)

    return jsonify({
        'message': 'Customer Added'
    })