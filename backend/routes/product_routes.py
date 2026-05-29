from flask import Blueprint, request, jsonify

product_bp = Blueprint('product', __name__)

products = []

@product_bp.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)


@product_bp.route('/add-product', methods=['POST'])
def add_product():
    data = request.json

    products.append(data)

    return jsonify({
        'message': 'Product Added Successfully'
    })