/* ==========================================================================
   FABRICBILL UNIFIED BILLING STYLESHEET - AUTOMATIC CUSTOMER SYNC
   ========================================================================== */

const API = "http://127.0.0.1:5000";
let currentBillingItems = [];
let finalizedGrandTotal = 0;

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelector('.nav-links a.active')?.classList.remove('active');

    navItems.forEach(item => {
        const hrefValue = item.getAttribute('href');
        if (currentPage === hrefValue || ((currentPage === "" || currentPage === "index.html") && hrefValue === "index.html")) {
            item.classList.add('active');
        }
    });

    loadBillingProducts();
});

function loadBillingProducts() {
    fetch(`${API}/api/bills`)
        .then(res => res.json())
        .then(bills => {
            console.log("Database entries synchronized:", bills);
            currentBillingItems = bills; 
            processCalculations();
        })
        .catch(err => {
            console.error("Critical: Could not connect to API server:", err);
            currentBillingItems = [];
            processCalculations();
        });
}

function processCalculations() {
    const tbody = document.getElementById("billingItemsBody");
    if (!tbody) return;
    
    tbody.innerHTML = '';
    let subtotalValue = 0;

    if (!currentBillingItems || currentBillingItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#777; padding:24px;">No items currently staged in active cart.</td></tr>`;
        document.getElementById("subtotalDisplay").innerText = "₹0";
        document.getElementById("gstDisplay").innerText = "₹0";
        document.getElementById("grandTotalDisplay").innerText = "₹0";
        return;
    }

    currentBillingItems.forEach(bill => {
        let amount = parseFloat(bill.total_amount) || 0;
        subtotalValue += amount;

        tbody.innerHTML += `
            <tr>
              <td>Bill Reference: ${bill.customer_name || 'Walk-in Customer'}</td>
              <td class="align-right">₹${amount.toFixed(2)}</td>
              <td class="align-center">1</td>
              <td class="align-right">₹${amount.toFixed(2)}</td>
            </tr>
        `;
    });

    let gstValue = subtotalValue * 0.05;
    finalizedGrandTotal = subtotalValue + gstValue;

    if(document.getElementById("subtotalDisplay")) document.getElementById("subtotalDisplay").innerText = "₹" + subtotalValue.toFixed(2);
    if(document.getElementById("gstDisplay")) document.getElementById("gstDisplay").innerText = "₹" + gstValue.toFixed(2);
    if(document.getElementById("grandTotalDisplay")) document.getElementById("grandTotalDisplay").innerText = "₹" + finalizedGrandTotal.toFixed(2);
}

// 🟢 FIX: No prompts, no alerts. Automatically uses pre-filled customer data.
document.getElementById('generateInvoiceBtn').addEventListener('click', () => {
    const tbody = document.getElementById("billingItemsBody");

    if (!currentBillingItems || currentBillingItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#dc2626; font-weight:bold; padding:24px;">❌ Error: Cannot check out an empty cart!</td></tr>`;
        return;
    }

    /* 👉 AUTOMATIC PICKUP: 
       If your 'customer.html' page saves the selected customer name to localStorage 
       when you click on them, this line grabs it instantly without asking the user.
       If nothing is found, it defaults to 'Walk-in Customer'.
    */
    const activeCustomer = localStorage.getItem("selectedCustomerName") || "Walk-in Customer";

    fetch(`${API}/api/bills`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            customer_name: activeCustomer, // Automatic entry
            total_amount: finalizedGrandTotal.toFixed(2)
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Server confirmation:", data.message);
        const dataString = encodeURIComponent(JSON.stringify(currentBillingItems));
        window.location.href = `invoice.html?items=${dataString}`;
    })
    .catch(err => {
        console.error("Database sync failure:", err);
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#dc2626; font-weight:bold; padding:24px;">❌ Network Error: Could not save to server.</td></tr>`;
    });
});

document.getElementById('clearBillBtn').addEventListener('click', () => {
    if(confirm("Are you sure you want to clear the display screen?")) {
        currentBillingItems = [];
        processCalculations();
    }
});