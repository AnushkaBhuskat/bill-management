
from flask import Blueprint, request, jsonify
from database.db import get_db_connection

bill_bp = Blueprint('bill', __name__)


# GET ALL BILLS
@bill_bp.route('/api/bills', methods=['GET'])
def get_bills():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM bills")

    bills = cursor.fetchall()

    conn.close()

    bill_list = []

    for bill in bills:

        bill_data = {
            "id": bill[0],
            "customer_id": bill[1],
            "product_name": bill[2],
            "quantity": bill[3],
            "price": bill[4],
            "total": bill[5]
        }

        bill_list.append(bill_data)

    return jsonify(bill_list)


# CREATE BILL
@bill_bp.route('/api/bills', methods=['POST'])
def create_bill():

    data = request.json

    conn = get_db_connection()

    cursor = conn.cursor()

    query = """
    INSERT INTO bills
    (customer_id, product_name, quantity, price, total)
    VALUES (?, ?, ?, ?, ?)
    """

    total = data['quantity'] * data['price']

    values = (
        data['customer_id'],
        data['product_name'],
        data['quantity'],
        data['price'],
        total
    )

    cursor.execute(query, values)

    conn.commit()

    conn.close()

    return jsonify({
        "message": "Bill Created Successfully"
    })
