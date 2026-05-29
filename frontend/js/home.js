// ==========================
// DASHBOARD JS FILE
// FRONTEND CONNECTED WITH
// PYTHON FLASK BACKEND
// ==========================


// ==========================
// API URL
// ==========================

const API = "http://127.0.0.1:5000";


// ==========================
// FETCH DASHBOARD DATA
// ==========================

async function fetchDashboardData() {

  try {

    // API CALL TO FLASK BACKEND
    const response = await fetch(`${API}/api/dashboard`);

    // CONVERT RESPONSE TO JSON
    const data = await response.json();

    console.log("Dashboard Data:", data);


    // ==========================
    // UPDATE DASHBOARD VALUES
    // ==========================

    document.getElementById("totalProducts").innerText =
      data.total_products;

    document.getElementById("totalCustomers").innerText =
      data.total_customers;

    document.getElementById("totalBills").innerText =
      data.total_bills;

    document.getElementById("revenue").innerText =
      data.revenue;

  }

  catch (error) {

    console.log("Error Fetching Dashboard Data:", error);

  }

}


// ==========================
// CALL FUNCTION
// ==========================

fetchDashboardData();