//face callurile de API si aduce produsele ale caror ID-uri se gasesc in local storage
let responseArray = [];
async function makeAPIRequests() {
  let promiseArray = [];
  //trece prin fiecare element din local storage
  for (let i = 0; i < localStorage.length; i++) {
    let promise = fetch(
      `https://646e37d19c677e23218b4bb6.mockapi.io/paintings/${localStorage.key(
        i
      )}`
    )
      .then((rasp1) => rasp1.json())
      .then((rasp2) => {
        rasp2.quantity = parseInt(localStorage.getItem(localStorage.key(i)));
        responseArray.push(rasp2);
      });
    //se populeaza promiseArray cu API callurile de mai sus
    promiseArray.push(promise);
  }
  //astept sa se efectueze toate API calls cu succes
  await Promise.all(promiseArray);
  //display la produse pe pagina
  displayProductsCart(responseArray);
}
makeAPIRequests();

function displayProductsCart(listOfProducts) {
  let toate = "";
  for (let i = 0; i < listOfProducts.length; i++) {
    let thisDiv = `<div class="items" id="${listOfProducts[i].id}">
      <img src="${listOfProducts[i].image}" width="200" height="100">
      <div class="beginning">
        <h2>
          <a href="/src/pages/details/details.html?id=${
            listOfProducts[i].id
          }">${listOfProducts[i].name}</a>
        </h2>
        <h3>Price: <span>${listOfProducts[i].price}</span> $</h3>
      </div>
      <div id="cantitate">
        <button class="decrement" onclick=decrementQuantity(this)>-</button>
        <p>${listOfProducts[i].quantity}</p>
        <button class="increment" onclick=incrementQuantity(this)>+</button>
      </div>
      <div id="ending">
        <div id="final">
          <p>Total price:</p>
          <p >${listOfProducts[i].price * listOfProducts[i].quantity} $</p>
        </div>
        <button class="removeElement" id="${
          listOfProducts[i].id
        }" onclick=deleteProductFromCart(this)>X</button>
      </div>
    </div>`;
    toate = toate + thisDiv;
  }

  document.querySelector(".cartContainer").innerHTML += toate;
  updateTotalPriceOfCart();
}

function deleteProductFromCart(delButton) {
  let productId = delButton.parentElement.id;
  //scoate din local storage
  localStorage.removeItem(productId);
  //scoate din HTML vizual
  delButton.parentElement.parentElement.remove();
  //scoate din response array
  responseArray.pop;
  updateTotalPriceOfCart();
}

function updateTotalPriceOfCart() {
  let totalSum = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let anotherId = localStorage.key(i);
    let anotherQuantity = localStorage.getItem(localStorage.key(i));
    // gasim pretul elementului cu Id-ul din key (anotherId)
    let pretProdus = 0;
    for (let j = 0; j <= responseArray.length - 1; j++) {
      if (anotherId == responseArray[j].id) {
        pretProdus = responseArray[j].price;
      }
    }
    let inm = pretProdus * anotherQuantity;
    totalSum = totalSum + inm;
  }

  document.getElementById("valoare").innerHTML = totalSum + " $";
}

function decrementQuantity(decrementButton) {
  // first we extract the parent id from the div
  let productId = decrementButton.parentElement.parentElement.id;
  // getting the current price from HTML paragraph
  // VISUAL IN HTML
  let quantityFromHTML =
    decrementButton.parentElement.getElementsByTagName("p")[0].innerHTML;
  // update price in HTML by subtracting 1
  decrementButton.parentElement.getElementsByTagName("p")[0].innerHTML =
    quantityFromHTML - 1;
  // UPDATE IN LOCALSTORAGE
  // getting the quantity associated with the productId from localstorage
  let quantityFromLocalStorage = localStorage.getItem(productId);
  // update that value by subtracting 1
  localStorage.setItem(productId, parseInt(quantityFromLocalStorage - 1));
  // update the totalPrice of element
  // TOTAL PRICE FOR ELEMENT
  let priceForElement =
    decrementButton.parentElement.parentElement.getElementsByTagName("span")[0]
      .innerHTML;
  // let's calculate first the new value
  decrementButton.parentElement.parentElement.getElementsByTagName(
    "p"
  )[2].innerHTML = priceForElement * (quantityFromHTML - 1) + " $";
  // TOTAL PRICE FOR ALL ELEMENTS
  // finally we update the totalPrice of all elements
  updateTotalPriceOfCart();
}

function incrementQuantity(incrementButton) {
  // first we extract the parent id from the div
  let productId = incrementButton.parentElement.parentElement.id;
  // getting the current price from HTML paragraph
  // VISUAL IN HTML
  let quantityFromHTML = parseInt(
    incrementButton.parentElement.getElementsByTagName("p")[0].innerHTML
  );
  // update price in HTML by adding 1
  incrementButton.parentElement.getElementsByTagName("p")[0].innerHTML =
    parseInt(quantityFromHTML + 1);
  // UPDATE IN LOCALSTORAGE
  // getting the quantity associated with the productId from localstorage
  let quantityFromLocalStorage = parseInt(localStorage.getItem(productId));
  // update that value by adding 1
  localStorage.setItem(productId, parseInt(quantityFromLocalStorage + 1));
  // update the totalPrice of element
  // TOTAL PRICE FOR ELEMENT
  let priceForElement = parseInt(
    incrementButton.parentElement.parentElement.getElementsByTagName("span")[0]
      .innerHTML
  );
  // let's calculate first the new value
  incrementButton.parentElement.parentElement.getElementsByTagName(
    "p"
  )[2].innerHTML = priceForElement * parseInt(quantityFromHTML + 1) + " $";
  // TOTAL PRICE FOR ALL ELEMENTS
  // finally we update the totalPrice of all elements
  updateTotalPriceOfCart();
}
