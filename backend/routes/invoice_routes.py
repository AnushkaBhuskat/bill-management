
from flask import Blueprint, jsonify
from database.db import get_db_connection

invoice_bp = Blueprint('invoice', __name__)


# GET ALL INVOICES
@invoice_bp.route('/api/invoices', methods=['GET'])
def get_invoices():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM invoices")

    invoices = cursor.fetchall()

    conn.close()

    invoice_list = []

    for invoice in invoices:

        invoice_data = {
            "id": invoice[0],
            "invoice_no": invoice[1],
            "customer_name": invoice[2],
            "mobile": invoice[3],
            "address": invoice[4],
            "subtotal": invoice[5],
            "gst": invoice[6],
            "grand_total": invoice[7],
            "payment_status": invoice[8],
            "invoice_date": invoice[9]
        }

        invoice_list.append(invoice_data)

    return jsonify(invoice_list)
