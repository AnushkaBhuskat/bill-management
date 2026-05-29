from flask import Blueprint, jsonify

invoice_bp = Blueprint('invoice', __name__)

invoices = []

@invoice_bp.route('/invoices', methods=['GET'])
def get_invoices():
    return jsonify(invoices)