from flask import Blueprint, request, jsonify
from database.db import get_db_connection

customer_bp = Blueprint('customer', __name__)


# GET ALL CUSTOMERS
@customer_bp.route('/api/customer', methods=['GET'])
def get_customers():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM customers")

    customers = cursor.fetchall()

    conn.close()

    customer_list = []

    for customer in customers:

        customer_data = {
            "id": customer[0],
            "customer_name": customer[1],
            "mobile": customer[2],
            "address": customer[3]
        }

        customer_list.append(customer_data)

    return jsonify(customer_list)


# ADD CUSTOMER
@customer_bp.route('/api/customer', methods=['POST'])
def add_customer():

    data = request.json

    conn = get_db_connection()

    cursor = conn.cursor()

    query = """
    INSERT INTO customers
    (customer_name, mobile, address)
    VALUES (?, ?, ?)
    """

    values = (
        data['customer_name'],
        data['mobile'],
        data['address']
    )

    cursor.execute(query, values)

    conn.commit()

    conn.close()

    return jsonify({
        "message": "Customer Added Successfully"
    })
