// ==========================
// PRODUCTS DATA
// ==========================

let products = JSON.parse(
  localStorage.getItem("products")
);


// ==========================
// CUSTOMERS DATA
// ==========================

let customers = JSON.parse(
  localStorage.getItem("customers")
);


// ==========================
// BILLS DATA
// ==========================

let bills = JSON.parse(
  localStorage.getItem("bills")
);


// ==========================
// DEMO DATA
// ==========================

if(!products){

  products = [

    {
      name: "Cotton Saree",
      price: 1200
    },

    {
      name: "Linen Shirt",
      price: 850
    },

    {
      name: "Silk Kurti",
      price: 1500
    }

  ];

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );
}


if(!customers){

  customers = [

    {
      name: "Priya Sharma"
    }

  ];

  localStorage.setItem(
    "customers",
    JSON.stringify(customers)
  );
}


if(!bills){

  bills = [

    {
      billNo: 1
    }

  ];

  localStorage.setItem(
    "bills",
    JSON.stringify(bills)
  );
}


// ==========================
// SHOW DASHBOARD DATA
// ==========================

document.getElementById("totalProducts").innerText =
  products.length;

document.getElementById("totalCustomers").innerText =
  customers.length;

document.getElementById("totalBills").innerText =
  bills.length;