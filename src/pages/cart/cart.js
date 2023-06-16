async function makeAPIRequests() {
  // let idk = document.getElementById("addToCartB");
  // idk.addEventListener("click", habarnamce);
  let responseArray = [];
  let promiseArray = [];

  for (let i = 0; i < localStorage.length; i++) {
    let promise = fetch(
      `https://646e37d19c677e23218b4bb6.mockapi.io/paintings/${localStorage.key(
        i
      )}`
    )
      .then((rasp1) => rasp1.json())
      .then((rasp2) => responseArray.push(rasp2));
    promiseArray.push(promise);
  }

  await Promise.all(promiseArray);
  console.log(responseArray);
  displayProductsCart(responseArray);
}
makeAPIRequests();

function displayProductsCart(listOfProducts) {
  let toate = "";
  for (let i = 0; i < listOfProducts.length; i++) {
    let thisDiv = `<div class="items">
    <img src="${listOfProducts[i].image}" width="200" height="100">
    <div>
    <p>${listOfProducts[i].name}</p>
    <p>${listOfProducts[i].price}</p></div>
    <button >X</button>
    <div><p>Total</p>
    <p>${localStorage.getItem(localStorage.key(i))}</p></div>
    </div>`;
    toate = toate + thisDiv;
  }
  console.log(toate);
  document.querySelector(".cartContainer").innerHTML += toate;
  document.querySelector(
    ".cartContainer"
  ).innerHTML += `<p id="totalPrice">TOTAL</p>`;
}
