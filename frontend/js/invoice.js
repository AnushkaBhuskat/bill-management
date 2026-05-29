document.addEventListener("DOMContentLoaded", async function () {

  // =========================
  // API BASE
  // =========================
  const API = "http://127.0.0.1:5000";

  // =========================
  // DATE (FRONTEND ONLY)
  // =========================
  document.getElementById("invoiceDate").textContent =
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

  try {

    // =========================
    // FETCH CUSTOMER + BILL
    // =========================
    const customerRes = await fetch(`${API}/api/customer/latest`);
    const billingRes = await fetch(`${API}/api/billing/latest`);

    if (!customerRes.ok || !billingRes.ok) {
      throw new Error("Customer or Billing API failed");
    }

    const customer = await customerRes.json();
    const billingItems = await billingRes.json();

    // =========================
    // CUSTOMER UI
    // =========================
    document.getElementById("customerName").textContent = customer.name;
    document.getElementById("customerMobile").textContent = customer.mobile;
    document.getElementById("customerAddress").textContent = customer.address;

    // =========================
    // INVOICE NUMBER
    // =========================
    document.getElementById("invoiceNumber").textContent =
      "INV-" + Date.now();

    // =========================
    // TABLE ITEMS
    // =========================
    const tbody = document.getElementById("invoiceItems");
    tbody.innerHTML = "";

    let subtotal = 0;

    billingItems.forEach(item => {

      const price = Number(item.price);
      const qty = Number(item.qty);
      const total = price * qty;

      subtotal += total;

      tbody.innerHTML += `
        <tr>
          <td>${item.product}</td>
          <td>₹${price}</td>
          <td>${qty}</td>
          <td>₹${total}</td>
        </tr>
      `;
    });

    // =========================
    // TOTALS
    // =========================
    const gst = subtotal * 0.05;
    const grandTotal = subtotal + gst;

    document.getElementById("subtotal").textContent = `₹${subtotal}`;
    document.getElementById("gst").textContent = `₹${gst.toFixed(2)}`;
    document.getElementById("grandTotal").textContent = `₹${grandTotal.toFixed(2)}`;

    // =========================
    // FETCH ALL INVOICES LIST (NEW INTEGRATION)
    // =========================
    const invoicesRes = await fetch(`${API}/api/invoices`);

    if (invoicesRes.ok) {
      const invoices = await invoicesRes.json();

      console.log("All invoices:", invoices);

      invoices.forEach(inv => {
        console.log("Invoice ID:", inv.id);
      });

    } else {
      console.warn("Invoices API not working");
    }

  }

  catch (err) {
    console.error("Invoice Error:", err);
    alert("Failed to load invoice data");
  }

});