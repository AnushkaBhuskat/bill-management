document.addEventListener("DOMContentLoaded", async function () {

  // =========================
  // DATE (ALWAYS WORKS)
  // =========================
  document.getElementById("invoiceDate").textContent =
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

  try {

    // =========================
    // BACKEND DATA
    // =========================
    const customerRes = await fetch("/api/customer/latest");
    const billingRes = await fetch("/api/billing/latest");

    const customer = await customerRes.json();
    const billingItems = await billingRes.json();

    // =========================
    // CUSTOMER
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
    // ITEMS
    // =========================
    const tbody = document.getElementById("invoiceItems");
    tbody.innerHTML = "";

    let subtotal = 0;

    billingItems.forEach(item => {
      const total = item.price * item.qty;
      subtotal += total;

      tbody.innerHTML += `
        <tr>
          <td>${item.product}</td>
          <td>₹${item.price}</td>
          <td>${item.qty}</td>
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

  }

  catch (err) {
    console.error(err);
    alert("Failed to load invoice data");
  }

});