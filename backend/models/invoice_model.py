from backend.database.db import get_db_connection


def create_invoice(
    invoice_no,
    customer_name,
    mobile,
    address,
    subtotal,
    gst,
    grand_total,
    payment_status,
    invoice_date
):

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO invoices
    (
        invoice_no,
        customer_name,
        mobile,
        address,
        subtotal,
        gst,
        grand_total,
        payment_status,
        invoice_date
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        invoice_no,
        customer_name,
        mobile,
        address,
        subtotal,
        gst,
        grand_total,
        payment_status,
        invoice_date
    ))

    conn.commit()

    invoice_id = cursor.lastrowid

    conn.close()

    return invoice_id


def add_invoice_item(
    invoice_id,
    product_name,
    price,
    quantity,
    total
):

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO invoice_items
    (
        invoice_id,
        product_name,
        price,
        quantity,
        total
    )
    VALUES (?, ?, ?, ?, ?)
    """, (
        invoice_id,
        product_name,
        price,
        quantity,
        total
    ))

    conn.commit()

    conn.close()

    print("Invoice Item Added Successfully")