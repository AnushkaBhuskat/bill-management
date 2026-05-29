from flask import Blueprint, request, jsonify
from database import get_connection

customer_bp = Blueprint('customer', __name__)


@customer_bp.route('/api/customers', methods=['GET'])
def get_customers():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM customers")
    customers = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify([dict(row) for row in customers])


@customer_bp.route('/api/customers', methods=['POST'])
def add_customer():
    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    query = "INSERT INTO customers(name, phone, address) VALUES(%s,%s,%s)"
    values = (
        data['name'],
        data['phone'],
        data['address']
    )

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Customer Added"})