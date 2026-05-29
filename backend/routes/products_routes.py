from flask import Blueprint, request, jsonify
from database.db import get_db_connection

product_bp = Blueprint('product', __name__)


# GET ALL PRODUCTS
@product_bp.route('/api/products', methods=['GET'])
def get_products():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM products")

    products = cursor.fetchall()

    conn.close()

    product_list = []

    for product in products:

        product_data = {
            "id": product[0],
            "product_name": product[1],
            "product_price": product[2],
            "stock": product[3]
        }

        product_list.append(product_data)

    return jsonify(product_list)


# ADD PRODUCT
@product_bp.route('/api/products', methods=['POST'])
def add_product():

    data = request.json

    conn = get_db_connection()

    cursor = conn.cursor()

    query = """
    INSERT INTO products
    (product_name, product_price, stock)
    VALUES (?, ?, ?)
    """

    values = (
        data['product_name'],
        data['product_price'],
        data['stock']
    )

    cursor.execute(query, values)

    conn.commit()

    conn.close()

    return jsonify({
        "message": "Product Added Successfully"
    })
