from backend.database.db import get_db_connection


# CREATE INVOICE
def create_invoice(customer_id, bill_id, total_amount, invoice_date):

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO invoices
    (customer_id, bill_id, total_amount, invoice_date)
    VALUES (?, ?, ?, ?)
    """, (customer_id, bill_id, total_amount, invoice_date))

    conn.commit()
    conn.close()

    print("Invoice Created Successfully")


# FETCH ALL INVOICES
def get_all_invoices():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("SELECT * FROM invoices")

    invoices = cursor.fetchall()

    conn.close()

    return invoices


# DELETE INVOICE
def delete_invoice(invoice_id):

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
    DELETE FROM invoices
    WHERE id = ?
    """, (invoice_id,))

    conn.commit()
    conn.close()

    print("Invoice Deleted Successfully")