let products = [];
function goToPage(page){

  window.location.href = page;

}

function displayProducts(){

  let table = document.getElementById("productTable");
  let grandTotal = 0;

  table.innerHTML = "";

  products.forEach((item,index)=>{

    let total = item.price * item.qty;
    grandTotal += total;

    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>${item.qty}</td>
        <td>₹${total}</td>
        <td>
          <button class="delete-btn" onclick="deleteProduct(${index})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  document.getElementById("grandTotal").innerText = grandTotal;
}

function addProduct(){

  let name = document.getElementById("productName").value;
  let price = document.getElementById("price").value;
  let qty = document.getElementById("qty").value;

  if(name === "" || price === "" || qty === ""){
    alert("Please fill all fields");
    return;
  }

  let product = {
    name:name,
    price:Number(price),
    qty:Number(qty)
  };

  products.push(product);

  displayProducts();

  document.getElementById("productName").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
}

function deleteProduct(index){

  products.splice(index,1);

  displayProducts();
}

displayProducts();