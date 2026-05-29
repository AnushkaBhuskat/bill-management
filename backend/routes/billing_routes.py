from flask import Blueprint, request, jsonify
from database import get_connection

bill_bp = Blueprint('bill', __name__)


@bill_bp.route('/api/bills', methods=['GET'])
def get_bills():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM bills")
    bills = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify([dict(row) for row in bills])


@bill_bp.route('/api/bills', methods=['POST'])
def create_bill():
    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    query = "INSERT INTO bills(customer_name, total_amount) VALUES(%s,%s)"

    values = (
        data['customer_name'],
        data['total_amount']
    )

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Bill Created"})