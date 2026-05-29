from flask import Blueprint, request, jsonify
from database.db import get_db_connection

customer_bp = Blueprint('customer', __name__)


# ====================================
# GET ALL CUSTOMERS
# ====================================

@customer_bp.route('/api/customers', methods=['GET'])
def get_customers():

    try:

        conn = get_db_connection()

        cursor = conn.cursor()

        cursor.execute("SELECT * FROM customers")

        customers = cursor.fetchall()

        conn.close()

        customer_list = []

        for customer in customers:

            customer_data = {
                "id": customer[0],
                "name": customer[1],
                "phone": customer[2],
                "address": customer[3]
            }

            customer_list.append(customer_data)

        return jsonify(customer_list)

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500



# ====================================
# ADD CUSTOMER
# ====================================

@customer_bp.route('/api/customers', methods=['POST'])
def add_customer():

    try:

        data = request.json

        # DATA FROM FRONTEND
        name = data.get('name')

        phone = data.get('phone')

        address = data.get('address')


        # VALIDATION
        if not name or not phone or not address:

            return jsonify({
                "status": "error",
                "message": "All fields are required"
            }), 400


        conn = get_db_connection()

        cursor = conn.cursor()

        # DATABASE COLUMN NAMES
        query = """
        INSERT INTO customers
        (customer_name, mobile, address)
        VALUES (?, ?, ?)
        """

        values = (
            name,
            phone,
            address
        )

        cursor.execute(query, values)

        conn.commit()

        conn.close()

        return jsonify({
            "status": "success",
            "message": "Customer Added Successfully"
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
