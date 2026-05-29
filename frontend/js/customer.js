const form = document.getElementById("customerForm");

function goToPage(page){

  window.location.href = page;

}

form.addEventListener("submit", function(e){

  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  let address = document.getElementById("address").value.trim();

  let nameError = document.getElementById("nameError");
  let mobileError = document.getElementById("mobileError");
  let addressError = document.getElementById("addressError");

  // Clear old errors
  nameError.innerText = "";
  mobileError.innerText = "";
  addressError.innerText = "";

  let valid = true;

  // Name Validation
  if(name === ""){
    nameError.innerText = "Please enter customer name.";
    valid = false;
  }

  // Mobile Validation
  if(!/^[0-9]{10}$/.test(mobile)){
    mobileError.innerText = "Enter a valid 10-digit mobile number.";
    valid = false;
  }

  // Address Validation
  if(address === ""){
    addressError.innerText = "Please enter address.";
    valid = false;
  }

  // Success
  if(valid){

    alert("Customer Saved Successfully!");

    form.reset();
  }

});