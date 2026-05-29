from flask import Blueprint, request, jsonify
from database import get_connection

product_bp = Blueprint('product', __name__)


@product_bp.route('/api/products', methods=['GET'])
def get_products():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify([dict(row) for row in products])


@product_bp.route('/api/products', methods=['POST'])
def add_product():
    data = request.json

    conn = get_connection()
    cursor = conn.cursor()

    query = "INSERT INTO products(name, price, quantity) VALUES(%s,%s,%s)"

    values = (
        data['name'],
        data['price'],
        data['quantity']
    )

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Product Added"})