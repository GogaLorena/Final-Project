fetch("https://646e37d19c677e23218b4bb6.mockapi.io/paintings")
  .then((response1) => response1.json())
  .then((response2) => displayAllProducts(response2));

function displayAllProducts(listOfObjects) {
  //il iau in parte pe fiecare
  let lipeala = "";
  for (let i = 0; i <= listOfObjects.length - 1; i++) {
    //ii fac casuta
    let currentDiv = `<div><img src="${listOfObjects[i].image}" width="200" height="200">
    <div class="details">
    <p>${listOfObjects[i].name}</p>
    <button type="button" onclick="location.href='./../../pages/details/details.html?id=${listOfObjects[i].id}';">Details</button>
    </div>
    </div>`;
    //lipesc casutele
    lipeala = lipeala + currentDiv;
  }
  //display in HTML
  document.querySelector(".productContainer").innerHTML = lipeala;
}
