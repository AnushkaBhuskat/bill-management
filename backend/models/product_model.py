from backend.database.db import get_db_connection


# ADD PRODUCT
def add_product(product_name, product_price, stock):

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO products
    (product_name, product_price, stock)
    VALUES (?, ?, ?)
    """, (product_name, product_price, stock))

    conn.commit()
    conn.close()

    print("Product Added Successfully")


# FETCH PRODUCTS
def get_all_products():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM products")

    products = cursor.fetchall()

    conn.close()

    return products


# UPDATE PRODUCT
def update_product(product_id, stock):

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
    UPDATE products
    SET stock = ?
    WHERE id = ?
    """, (stock, product_id))

    conn.commit()
    conn.close()

    print("Product Updated Successfully")


# DELETE PRODUCT
def delete_product(product_id):

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
    DELETE FROM products
    WHERE id = ?
    """, (product_id,))

    conn.commit()
    conn.close()

    print("Product Deleted Successfully")