# from flask import Blueprint, jsonify
# from database.db import get_connection

# home_bp = Blueprint('home_bp', __name__)

# @home_bp.route('/api/dashboard/stats', methods=['GET'])
# def dashboard_stats():

#     conn = get_connection()
#     cursor = conn.cursor(dictionary=True)

#     # TOTAL PRODUCTS
#     cursor.execute("SELECT COUNT(*) AS total_products FROM products")
#     total_products = cursor.fetchone()['total_products']

#     # TOTAL CUSTOMERS
#     cursor.execute("SELECT COUNT(*) AS total_customers FROM customers")
#     total_customers = cursor.fetchone()['total_customers']

#     # TOTAL BILLS
#     cursor.execute("SELECT COUNT(*) AS total_bills FROM bills")
#     total_bills = cursor.fetchone()['total_bills']

#     cursor.close()
#     conn.close()

#     return jsonify({
#         "total_products": total_products,
#         "total_customers": total_customers,
#         "total_bills": total_bills
#     })