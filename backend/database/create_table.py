from db import get_db_connection

conn = get_db_connection()

cursor = conn.cursor()

# Customers Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS customers (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    customer_name TEXT NOT NULL,

    mobile TEXT,

    address TEXT
)
""")

# Bills Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS bills (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    customer_id INTEGER,

    product_name TEXT,

    quantity INTEGER,

    price REAL,

    total REAL
)
""")

# Products Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS products (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    product_name TEXT NOT NULL,

    product_price REAL,

    stock INTEGER
)
""")

# Invoice Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS invoices (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    customer_id INTEGER,

    bill_id INTEGER,

    total_amount REAL,

    invoice_date TEXT
)
""")

conn.commit()

conn.close()


print("Tables Created Successfully")