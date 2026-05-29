from flask import Blueprint, jsonify
from database import get_connection

invoice_bp = Blueprint('invoice', __name__)


@invoice_bp.route('/api/invoices', methods=['GET'])
def get_invoices():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM invoices")
    invoices = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify([dict(row) for row in invoices])