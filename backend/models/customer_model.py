from database.db import get_db_connection

def add_customer(customer_name, mobile, address):

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO customers
    (customer_name, mobile, address)
    VALUES (?, ?, ?)
    """, (customer_name, mobile, address))

    conn.commit()

    conn.close()

    print("Customer Added Successfully")