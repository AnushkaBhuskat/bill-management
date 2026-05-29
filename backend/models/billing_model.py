from backend.database.db import get_db_connection


# CREATE BILL
def create_bill(customer_id, product_name, quantity, price):

    total = quantity * price

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO bills
    (customer_id, product_name, quantity, price, total)
    VALUES (?, ?, ?, ?, ?)
    """, (customer_id, product_name, quantity, price, total))

    conn.commit()
    conn.close()

    print("Bill Created Successfully")


# FETCH ALL BILLS
def get_all_bills():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM bills")

    bills = cursor.fetchall()

    conn.close()

    return bills


# DELETE BILL
def delete_bill(bill_id):

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
    DELETE FROM bills
    WHERE id = ?
    """, (bill_id,))

    conn.commit()
    conn.close()

    print("Bill Deleted Successfully")