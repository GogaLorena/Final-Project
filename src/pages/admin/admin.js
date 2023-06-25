let url = "https://646e37d19c677e23218b4bb6.mockapi.io/paintings";

fetch(url)
  .then((response1) => response1.json())
  .then((response2) => displayProductInTable(response2));

function displayProductInTable(listOfObjects) {
  //il iau in parte pe fiecare
  let productStockHTML = "";
  for (let i = 0; i <= listOfObjects.length - 1; i++) {
    //ii fac casuta
    let currentDiv = ` 
      <div id="${listOfObjects[i].id}"class="productRow">
        <div class="half1">
          <img src="${listOfObjects[i].image}">
          <p>${listOfObjects[i].name}</p>
        </div>
        <div class="half2">
          <p>${listOfObjects[i].price}</p>
          <p>${listOfObjects[i].piecesAvailable}</p>
          <button onclick=deleteProductFromList(this)>X</button>
        </div>
      </div>`;
    //lipesc casutele
    productStockHTML = productStockHTML + currentDiv;
  }
  //display in HTML
  document.querySelector(".productContainer").innerHTML += productStockHTML;
}
document.getElementById("openModalForAdd").addEventListener("click", openModal);
function openModal() {
  document.querySelector(".addProductModal").style.display = "flex";
}

// add product
document.getElementById("submitButton").addEventListener("click", (event) => {
  event.preventDefault();
  // get info from input text
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const author = document.getElementById("author").value;
  const image = document.getElementById("image").value;
  const piecesAvailable = document.getElementById("piecesAvailable").value;
  // assemble an object to be sent via the POST
  const jsonBody = {
    name,
    price,
    description,
    author,
    image,
    piecesAvailable,
  };
  // make the fetch call
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  })
    .then((response) => response.json())
    .then((data) => {
      //refresh the page with the new product
      fetch(url)
        .then((response1) => response1.json())
        .then((response2) => displayProductInTable(response2));
      alert("Product added successfully");
      document.querySelector(".addProductModal").style.display = "none";
    });
});

// delete product
function deleteProductFromList(productToDelete) {
  productToDelete.parentElement.parentElement.remove();
  let productId = productToDelete.parentElement.parentElement.id;
  fetch(url + `/${productId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
