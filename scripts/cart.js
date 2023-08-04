let cartLs = JSON.parse(localStorage.getItem("cart"));
const cotainerCart = document.querySelector(".container__cart--item");
let total = 0;
function cartNumber() {
  cart = JSON.parse(localStorage.getItem("cart"));
  cantCartProduct = cart.length;
  let cantItemCart = document.querySelector(".nav--ul-cant");
  cantItemCart.textContent = cantCartProduct;
}

if (localStorage.length > 0) {
  let itemName;
  cartNumber();

  cartLs.forEach((element) => {
    if(element.name.length>=10){
      let name=element.name;
     itemName=name.slice(0,-4);
     itemName+="...";
    }else{
      itemName=element.name;
    }
    const itemCart = document.createElement("div");

    itemCart.className = "cart--item";
    itemCart.innerHTML = `<img src="${element.img}" alt="" class="cart--img">
        <p class="cart--item--description">${itemName}</p>
        <p class="cart--price">$${element.price}</p>
       <div class="conteiner--cant--element">
       <button class="button--rest"  onClick="decreaseItemCart(${element.id})">-</button>
       <input value="${element.cant}" class="input--value" maxlength="120"> 
       <button class="button--add"  onClick="addItemCart(${element.id})">+</button>
       </div>
       <div class="div--button--delete">   <button class="cart-button--delete" onClick="removeItem(${element.id})"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="fill: rgba(234, 14, 20, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></button> </div>
     `;
    cotainerCart.append(itemCart);
  });
  itemCartOut();
  totalItem();
}
function actStorage() {
  const actStorage = JSON.stringify(cartLs);
  localStorage.setItem("cart", actStorage);
}

function totalItem() {
  const totala = document.querySelector(".total--price--cart");
  let total = 0;
  cartLs.forEach((element) => {
    total += Number(element.price) * element.cant;
  });
  totala.innerHTML = `$${total}`;
}

function removeItem(id) {
  const idItem = id;
  cartLs.forEach((element, i) => {
    if (Number(element.id) === idItem) {
      element.cant--;
      if (element.cant < 1) {
        cartLs.splice(i, 1);
      }
    }
  });

  actStorage();
  cartNumber();
  totalItem();
}

function deleteItem() {
  const ItemButton = document.querySelectorAll(".cart-button--delete");
  ItemButton.forEach((element) => {
    element.addEventListener("click", deleteItemFunctionHTML);
  });
}
deleteItem();
function deleteItemFunctionHTML(event) {
  const item = event.target;
  const divItemDelete = item.closest(".cart--item");
  const title = divItemDelete.querySelector(".cart--item--description");
  const valueItem = divItemDelete.querySelector(".input--value");
  valueItem.value--;
  if (valueItem.value < 1) {
    divItemDelete.remove();
  }
}

function clearStorage() {
  const itemPayment = document.querySelector(".total--pago");
  itemPayment.addEventListener("click", clearStorageFunction);
}

function clearStorageFunction(event) {
  const itemRPayment = event.target;

  const emailItem = document.getElementById("email--input");
  const nameItem = document.getElementById("name--input");
  const surNameItem = document.getElementById("surname--input");
  const dirItem = document.getElementById("dr--input");
  const cpItem = document.getElementById("CP--input");
  const conteinerLength = document.querySelectorAll(".cart--item").length;
  console.log(cpItem.value);
  if (
    emailItem.value != "" &&
    nameItem.value != "" &&
    surNameItem.value != "" &&
    dirItem.value != "" &&
    cpItem.value != ""
  ) {
    if (conteinerLength === 0) {
      Swal.fire({
        icon: "error",
        title: "Carrito vacio",
        text: "Por favor..Ingrese productos para comprar!",
        footer: '<a href="">Necesita mas informacion?</a>',
      });
    } else {
      cartLs.length = 0;
      actStorage();
      cartNumber();
      totalItem();
      console.log(cartLs);
      const divCart = document.querySelectorAll(".cart--item");
      divCart.forEach((element) => {
        element.remove();
      });
      (emailItem.value = ""),
        (nameItem.value = ""),
        (surNameItem.value = ""),
        (dirItem.value = ""),
        (cpItem.value = "");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Muchas Gracias por su compra",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Datos no ingresados correctamente",
      text: "Por favor..Ingrese todos los datos solicitados!",
      footer: '<a href="">Necesita mas informacion?</a>',
    });
  }
}
clearStorage();

function itemCartOut() {
  const conteinerLength = document.querySelectorAll(".cart--item").length;
  const cartConteiner = document.querySelector(".container__cart--item");
  console.log(conteinerLength);
  if (conteinerLength >= 5) {
    cartConteiner.style.height = "800px";
    cartConteiner.style.overflowY = "scroll";
  }
}

const addButtonCant = document.querySelectorAll(".cart--item--description");

function addItemCart(id) {
  const idItemAdd = id;
  cartLs.forEach((element) => {
    let nameItem = element.name;
    if (Number(element.id) === idItemAdd) {
      element.cant++;
      addButtonCant.forEach((elementAdd) => {
        if (nameItem === elementAdd.textContent) {
          const itemAdd = elementAdd.parentElement;
          const addElement = itemAdd.querySelector(".input--value");
          addElement.value++;
        }
      });
    }
  });
  actStorage();
  cartNumber();
  totalItem();
}
function decreaseItemCart(id) {
  const idItemAdd = id;
  cartLs.forEach((element) => {
    let nameItem = element.name;
    if (Number(element.id) === idItemAdd && element.cant > 1) {
      element.cant--;
      addButtonCant.forEach((elementAdd) => {
        if (nameItem === elementAdd.textContent) {
          const itemAdd = elementAdd.parentElement;
          const addElement = itemAdd.querySelector(".input--value");
          addElement.value--;
          if (addElement.value <= 1) {
            addElement.value = 1;
          }
        }
      });
      actStorage();
      cartNumber();
      totalItem();
    } else {
      element.cant = 1;
      actStorage();
      totalItem();
      cartNumber();
    }
  });
}
const itemCheckbox = document.querySelector(".dropdowncheck");
let cont = 1;
itemCheckbox.addEventListener("click", functionCheck);

function functionCheck(event) {
  cont++;
  const item = event.target;
  const cont1 = Number(cont);
  let ml = cont % 2;
  const svgItem = document.querySelector(".svg--menu");
  if (ml === 0) {
    svgItem.innerHTML = "";
    svgItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(139, 67, 56, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>`;
  }
  if (ml === 1) {
    svgItem.innerHTML = "";
    svgItem.innerHTML = `<svg class="svg--menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(139, 67, 56, 1);transform: msFilter"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>`;
  }
}
