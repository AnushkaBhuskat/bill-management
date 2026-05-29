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

// हा ग्लोबल ॲरे आता रिकामा आहे, यामध्ये फक्त API द्वारे आलेला डेटा बसेल
let currentBillingItems = [];

function loadBillingProducts() {
    // ==========================================================================
    // 🔴 FUTURE BACKEND INTEGRATION POINT (FETCH DATA FROM DATABASE)
    // ==========================================================================
    // जेव्हा बॅकएंड पार्टनर (Member 6) तुम्हाला API देईल, तेव्हा खालील ओळी कमेंट करा 
    // आणि त्याचा जागी Fetch API चा कोड लिहा.
    //
    // उदा.
    // fetch('YOUR_API_URL', { headers: { 'Authorization': 'Bearer YOUR_KEY' } })
    //   .then(res => res.json())
    //   .then(data => { currentBillingItems = data; processCalculations(); });
    // ==========================================================================

    // सध्या स्टॅटिक डेटा काढून टाकल्यामुळे ॲरे रिकामा राहील
    currentBillingItems = []; 
    processCalculations();
}

function processCalculations() {
    const tbody = document.getElementById("billingItemsBody");
    if (!tbody) return;
    
    tbody.innerHTML = '';
    let subtotalValue = 0;

    // जर डेटा नसेल तर टेबलमध्ये 'No items' असा मेसेज दिसेल
    if (currentBillingItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#777; padding:24px;">No items currently staged in active cart.</td></tr>`;
        if(document.getElementById("subtotalDisplay")) document.getElementById("subtotalDisplay").innerText = "₹0";
        if(document.getElementById("gstDisplay")) document.getElementById("gstDisplay").innerText = "₹0";
        if(document.getElementById("grandTotalDisplay")) document.getElementById("grandTotalDisplay").innerText = "₹0";
        return;
    }

    // जेव्हा API मधून डेटा येईल, तेव्हा हे लूप आपोआप चालू होईल आणि टेबल भरेल
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

    let gstValue = subtotalValue * 0.05;
    let grandTotalValue = subtotalValue + gstValue;

    if(document.getElementById("subtotalDisplay")) document.getElementById("subtotalDisplay").innerText = "₹" + subtotalValue;
    if(document.getElementById("gstDisplay")) document.getElementById("gstDisplay").innerText = "₹" + gstValue.toFixed(2);
    if(document.getElementById("grandTotalDisplay")) document.getElementById("grandTotalDisplay").innerText = "₹" + grandTotalValue.toFixed(2);
}

document.getElementById('generateInvoiceBtn').addEventListener('click', () => {
    if (!currentBillingItems || currentBillingItems.length === 0) {
        alert("Cannot generate transaction data packets for blank cart fields.");
        return;
    }

    // ==========================================================================
    // 🔴 FUTURE BACKEND INTEGRATION POINT (POST INVOICE TO SERVER)
    // ==========================================================================
    // डेटाबेसमध्ये बिल सुरक्षित करण्यासाठी बॅकएंड डेव्हलपर इथे त्याचा कोड जोडेल.
    // ==========================================================================

    const dataString = encodeURIComponent(JSON.stringify(currentBillingItems));
    window.location.href = `invoice.html?items=${dataString}`;
});

document.getElementById('clearBillBtn').addEventListener('click', () => {
    if(confirm("Are you sure you want to completely flush current cart rows?")) {
        currentBillingItems = [];
        processCalculations();
    }
});