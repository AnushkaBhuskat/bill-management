// ==========================================================================
// DYNAMIC NAVIGATION HIGHLIGHT RE-EVALUATION LOGIC
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split("/").pop();

    // Reset old markers manually to keep synchronization flawless
    document.querySelector('.nav-links a.active')?.classList.remove('active');

    navItems.forEach(item => {
        const hrefValue = item.getAttribute('href');
        if (currentPage === hrefValue || ((currentPage === "" || currentPage === "index.html") && hrefValue === "index.html")) {
            item.classList.add('active');
        }
    });

    // Initialize the billing dataset loading sequences
    loadBillingProducts();
});

// Global state matrix data array
let currentBillingItems = [];

/**
 * Loads current product datasets into display matrix.
 */
function loadBillingProducts() {
    // ----------------=====================================================
    // BACKEND INTEGRATION POINT: GET USER BILLING DATA FROM FLASK DB
    // ----------------=====================================================
    // Member 6 (Backend Integration) will connect this segment using a native API call.
    //
    // Example fetch invocation pattern:
    /*
    fetch('/api/billing/items', {
        headers: { 'Authorization': 'Bearer APP_API_KEY_HERE' }
    })
    .then(res => res.json())
    .then(data => {
        currentBillingItems = data;
        processCalculations();
    });
    */

    // LOCAL STORAGE CACHE TESTING FALLBACK:
    // Pulls data directly matching the items array structure on your friends page
    let cachedItems = JSON.parse(localStorage.getItem("billingItems"));

    if (!cachedItems) {
        cachedItems = [
            { product: "Cotton Saree", price: 450, qty: 2 },
            { product: "Linen Shirt Fabric", price: 180, qty: 3 },
            { product: "Woolen Shawl", price: 650, qty: 1 }
        ];
        localStorage.setItem("billingItems", JSON.stringify(cachedItems));
    }

    currentBillingItems = cachedItems;
    processCalculations();
}

/**
 * Compiles dynamic math totals and injects calculated elements safely into DOM nodes.
 */
function processCalculations() {
    const tbody = document.getElementById("billingItemsBody");
    const subtotalDisplay = document.getElementById("subtotal");
    const gstDisplay = document.getElementById("gst");
    const grandTotalDisplay = document.getElementById("grandTotal");

    tbody.innerHTML = '';
    let subtotalValue = 0;

    if (currentBillingItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#777; padding:20px;">No items in cart.</td></tr>`;
        document.getElementById("subtotalDisplay").innerText = "₹0";
        document.getElementById("gstDisplay").innerText = "₹0";
        document.getElementById("grandTotalDisplay").innerText = "₹0";
        return;
    }

    currentBillingItems.forEach(item => {
        let total = item.price * item.qty;
        subtotalValue += total;

        tbody.innerHTML += `
            <tr>
              <td>${item.product}</td>
              <td class="align-right">₹${item.price}</td>
              <td class="align-center">${item.qty}</td>
              <td class="align-right">₹${total}</td>
            </tr>
        `;
    });

    // Subtotal and GST processing
    let gstValue = subtotalValue * 0.05;
    let grandTotalValue = subtotalValue + gstValue;

    // Display updates inside matching layout selector tokens
    document.getElementById("subtotalDisplay").innerText = "₹" + subtotalValue;
    document.getElementById("gstDisplay").innerText = "₹" + gstValue.toFixed(2);
    document.getElementById("grandTotalDisplay").innerText = "₹" + grandTotalValue.toFixed(2);
}

// ROUTING INVOICE TRANSITION
document.getElementById('generateInvoiceBtn').addEventListener('click', () => {
    if (currentBillingItems.length === 0) {
        alert("Cannot generate an invoice for an empty list.");
        return;
    }
    
    // ----------------=====================================================
    // BACKEND INTEGRATION POINT: PERSIST TRANSACTION LOGS TO FLASK ENDPOINT
    // ----------------=====================================================
    /*
    fetch('/api/invoice/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: currentBillingItems })
    }).then(() => { window.location.href = "invoice.html"; });
    */

    window.location.href = "invoice.html";
});

// FLUSH CARD ENTRIES UTILITY
document.getElementById('clearBillBtn').addEventListener('click', () => {
    if(confirm("Clear current cart entries?")) {
        currentBillingItems = [];
        localStorage.removeItem("billingItems");
        processCalculations();
    }
});