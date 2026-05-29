const API = "http://127.0.0.1:5000";

let products = [];


// ==========================
// NAVIGATION
// ==========================

function goToPage(page){

  window.location.href = page;

}


// ==========================
// FETCH PRODUCTS
// ==========================

function fetchProducts(){

  fetch(`${API}/api/products`)

    .then(res => res.json())

    .then(data => {

      products = data;

      displayProducts();

    })

    .catch(error => {

      console.log(error);

    });

}


// ==========================
// DISPLAY PRODUCTS
// ==========================

function displayProducts(){

  let table = document.getElementById("productTable");

  let grandTotal = 0;

  table.innerHTML = "";


  products.forEach((item,index)=>{

    let total = item.price * item.quantity;

    grandTotal += total;

    table.innerHTML += `

      <tr>

        <td>${index + 1}</td>

        <td>${item.name}</td>

        <td>₹${item.price}</td>

        <td>${item.quantity}</td>

        <td>₹${total}</td>

        <td>

          <button class="delete-btn">

            <i class="fa-solid fa-trash"></i>

          </button>

        </td>

      </tr>

    `;

  });


  document.getElementById("grandTotal").innerText =
    grandTotal;

}


// ==========================
// ADD PRODUCT
// ==========================

function addProduct(){

  let name =
    document.getElementById("productName").value;

  let price =
    document.getElementById("price").value;

  let quantity =
    document.getElementById("qty").value;


  // VALIDATION

  if(name === "" || price === "" || quantity === ""){

    alert("Please fill all fields");

    return;
  }


  // API CALL

  fetch(`${API}/api/products`, {

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({

      name:name,
      price:price,
      quantity:quantity

    })

  })

  .then(res => res.json())

  .then(data => {

    alert(data.message);


    // CLEAR INPUTS

    document.getElementById("productName").value = "";

    document.getElementById("price").value = "";

    document.getElementById("qty").value = "";


    // REFRESH PRODUCTS

    fetchProducts();

  })

  .catch(error => {

    console.log(error);

    alert("Server Error");

  });

}


// ==========================
// INITIAL LOAD
// ==========================

fetchProducts();