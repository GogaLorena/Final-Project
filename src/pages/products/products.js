imagine6 = "";
let promise = fetch("https://646e37d19c677e23218b4bb6.mockapi.io/paintings")
  .then((response1) => response1.json())
  .then((response2) => displayProductInTable(response2));

function displayProductInTable(listOfObjects) {
  //il iau in parte pe fiecare
  let lipeala = "";
  for (let i = 0; i <= listOfObjects.length - 1; i++) {
    //ii fac casuta
    let currentDiv = `<div class="paintings"><img src="${
      listOfObjects[i].image
    }" width="300" height="400">
    <div class="overlay overlay-blur"><p>${
      listOfObjects[i].description.split(".")[0]
    }...</p>
		  </div>
    <div class="details">
    
    <p>${listOfObjects[i].name}</p>
    <button type="button" onclick="location.href='./../../pages/details/details.html?id=${
      listOfObjects[i].id
    }';"><i class="fa-regular fa-circle"></i><i class="fa-regular fa-circle"></i><i class="fa-regular fa-circle"></i></button>
    </div>
    </div>`;
    //lipesc casutele
    lipeala = lipeala + currentDiv;
  }
  //display in HTML
  document.querySelector(".productContainer").innerHTML += lipeala;
}
Promise.all([promise]).then(
  (values) => (imagine6 = document.getElementsByTagName("div")[6])
);
