from flask import Blueprint, request, jsonify

billing_bp = Blueprint('billing', __name__)

bills = []

@billing_bp.route('/generate-bill', methods=['POST'])
def generate_bill():
    data = request.json

    total = 0

    for item in data['items']:
        total += item['price'] * item['quantity']

    bill = {
        'customer': data['customer'],
        'items': data['items'],
        'total': total
    }

    bills.append(bill)

    return jsonify(bill)