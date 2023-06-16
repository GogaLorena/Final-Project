let urlParam = new URLSearchParams(window.location.search);
const productId = urlParam.get("id");

fetch("https://646e37d19c677e23218b4bb6.mockapi.io/paintings/" + productId)
  .then((response1) => response1.json())
  .then((response2) => displayProductDetails(response2));

function displayProductDetails(painting) {
  let currentdiv = `<div class="picAndInfo">
    <img src="${painting.image}" width="600" height="600"> 
    <div class="more">
    <p>${painting.name}</p>
    <p>${painting.price}</p>
    <p>${painting.description}</p>
    <p>${painting.author}</p> 
    <p>${painting.paintedDate}</p> 
    <p>${painting.piecesAvailable}</p>
    <button type="button" id="addToCartB" onclick="addToCart()">Add to cart</button>
    </div>
  </div>`;
  document.querySelector(".detailsContainer").innerHTML = currentdiv;
}

function addToCart() {
  // daca exista o cheie cu acest id in localstorage
  if (localStorage.getItem(productId) !== null) {
    let currentValue = localStorage.getItem(productId);
    localStorage.setItem(productId, parseInt(currentValue) + 1);
  } else {
    localStorage.setItem(productId, 1);
  }
  alert("Produs adaugat cu succes!");
}
