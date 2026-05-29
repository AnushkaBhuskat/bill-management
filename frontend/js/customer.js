const API = "http://127.0.0.1:5000";

const form = document.getElementById("customerForm");


// ==========================
// NAVIGATION
// ==========================

function goToPage(page){

  window.location.href = page;

}


// ==========================
// FORM SUBMIT
// ==========================

form.addEventListener("submit", function(e){

  e.preventDefault();

  let name = document.getElementById("name").value.trim();

  let mobile = document.getElementById("mobile").value.trim();

  let address = document.getElementById("address").value.trim();

  let nameError = document.getElementById("nameError");

  let mobileError = document.getElementById("mobileError");

  let addressError = document.getElementById("addressError");


  // CLEAR OLD ERRORS

  nameError.innerText = "";

  mobileError.innerText = "";

  addressError.innerText = "";


  let valid = true;


  // ==========================
  // NAME VALIDATION
  // ==========================

  if(name === ""){

    nameError.innerText =
      "Please enter customer name.";

    valid = false;
  }


  // ==========================
  // MOBILE VALIDATION
  // ==========================

  if(!/^[0-9]{10}$/.test(mobile)){

    mobileError.innerText =
      "Enter a valid 10-digit mobile number.";

    valid = false;
  }


  // ==========================
  // ADDRESS VALIDATION
  // ==========================

  if(address === ""){

    addressError.innerText =
      "Please enter address.";

    valid = false;
  }


  // ==========================
  // SAVE CUSTOMER
  // ==========================

  if(valid){

    fetch(`${API}/api/customers`, {

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        name:name,
       phone:mobile,
        address:address

      })

    })

    .then(res => res.json())

    .then(data => {

      alert(data.message);

      form.reset();

    })

    .catch(error => {

      console.log(error);

      alert("Server Error");

    });

  }

});