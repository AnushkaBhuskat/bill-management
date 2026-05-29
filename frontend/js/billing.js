/* ==========================================================================
   FABRICBILL UNIFIED BILLING STYLESHEET - CLEAN API INTEGRATION
   ========================================================================== */

const API = "http://127.0.0.1:5000";
let currentBillingItems = [];

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

    // Directly trigger your GET API request on page load
    loadBillingProducts();
});

// 🟢 GET INTEGRATION: Fetches real data exclusively from your endpoint
function loadBillingProducts() {
    fetch(`${API}/api/bills`)
        .then(res => res.json())
        .then(bills => {
            console.log("Database payload received:", bills);
            // Assign the API response array directly to the app state
            currentBillingItems = bills; 
            processCalculations();
        })
        .catch(err => {
            console.error("API Fetch Error:", err);
            currentBillingItems = [];
            processCalculations();
        });
}

function processCalculations() {
    const tbody = document.getElementById("billingItemsBody");
    if (!tbody) return;
    
    tbody.innerHTML = '';
    let subtotalValue = 0;

    // If database table is empty, show empty status message
    if (!currentBillingItems || currentBillingItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#777; padding:24px;">No items currently staged in active cart.</td></tr>`;
        document.getElementById("subtotalDisplay").innerText = "₹0";
        document.getElementById("gstDisplay").innerText = "₹0";
        document.getElementById("grandTotalDisplay").innerText = "₹0";
        return;
    }

    // Loop through the data directly returned by your API
    currentBillingItems.forEach(bill => {
        // Since your API handles tracking by 'customer_name' and 'total_amount', 
        // we map 'customer_name' to the Product column and treat the total as the amount.
        let amount = parseFloat(bill.total_amount) || 0;
        subtotalValue += amount;

        tbody.innerHTML += `
            <tr>
              <td>Bill for: ${bill.customer_name || 'Walk-in Customer'}</td>
              <td class="align-right">₹${amount}</td>
              <td class="align-center">1</td>
              <td class="align-right">₹${amount}</td>
            </tr>
        `;
    });

    let gstValue = subtotalValue * 0.05;
    let grandTotalValue = subtotalValue + gstValue;

    if(document.getElementById("subtotalDisplay")) document.getElementById("subtotalDisplay").innerText = "₹" + subtotalValue.toFixed(2);
    if(document.getElementById("gstDisplay")) document.getElementById("gstDisplay").innerText = "₹" + gstValue.toFixed(2);
    if(document.getElementById("grandTotalDisplay")) document.getElementById("grandTotalDisplay").innerText = "₹" + grandTotalValue.toFixed(2);
}

// 🟢 POST INTEGRATION: Create Bill entries using your exact logic setup
document.getElementById('generateInvoiceBtn').addEventListener('click', () => {
    // Prompting for input data directly since there isn't an explicit input form on this page structure
    const customerName = prompt("Enter Customer Name:");
    const totalAmount = prompt("Enter Total Bill Amount (₹):");

    if (!customerName || !totalAmount) {
        alert("Operation cancelled. Data fields cannot be empty.");
        return;
    }

    fetch(`${API}/api/bills`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            customer_name: customerName,
            total_amount: totalAmount
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        // Refresh dashboard UI instantly with updated server entries
        loadBillingProducts(); 
    })
    .catch(err => {
        console.error("API POST Error:", err);
    });
});

document.getElementById('clearBillBtn').addEventListener('click', () => {
    if(confirm("Are you sure you want to clear the local view dashboard fields?")) {
        currentBillingItems = [];
        processCalculations();
    }
});