const extraerProductos = async () => {
  const resp = await fetch("../data.json");
  const data = await resp.json();
  cargarProductos(data);
};

let cart = [];

if (localStorage.length > 0) {
  let cantItemCart = document.querySelector(".nav--ul-cant");
  let cantCartProduct = 0;
  cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    cantCartProduct = cart.length;
  } else {
    cantItemCart = 0;
  }
  cantItemCart.textContent = cantCartProduct;
}

let products = [];
extraerProductos();
let cargarProductos = (data) => {
  products = data;
  products.forEach((element) => {
    addItemsCatalog(element.name, element.id, element.img, element.price);
  });
};
function addItemsCatalog(name, id, img, price) {
  const conteinerItemsProduct = document.querySelector(".conteiner--catalog");
  const divAddCat = document.createElement("div");
  divAddCat.classList.add("item--product--descrp");
  divAddCat.innerHTML = ` 
    <div class="item--product--contai">
    <img src= ${img} alt="" class="image--cartHome" >
  
    <div class="heart-container" title="Like">
            <input type="checkbox" class="checkbox" id="Give-It-An-Id">
            <div class="svg-container">
                <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                    </path>
                </svg>
                <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                    </path>
                </svg>
                <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                </svg>
            </div>
        </div>
   <button class="svg--icon"><img class="img--notfav" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR5JREFUSEvFlUEOgjAQRf/gprgzwb2eRD2JehLhJOJJ9Ca6l8SddKNjCkKEFilQY1ekbf7r/52hhB8P+rE+/gO4CrEkz1uDeQngkrlkPgRSxuozEWIDz1s0rX+mojlIfP8IQAmbxuk9aV4nikfPZzSRMj8UUI2oRdzqupg5nEoZaYAsFiJ1+uGDeVvEWUaUjMd7MG+Gq6tcKA7u920losT32Yl4LnIK0nRVB5wBzBxBLkGazqsAlxGZHFyF2BFR6MIBM6+mUmYlXekDRxdd5q8BbkLMHnmp9r2LMntjo6nJARBNXHNQUHtAjOKNgI5OGsW/AiwhX8VbAS2QVnErQAPEStwaUIOg+A3YNGWnJ1NV1+dj4hxgI1jf08lBH8ALdISGGdIfSR8AAAAASUVORK5CYII="/> </button>
    </div>
   
    <div class=" div--descr--item">
    <p class="tittle--text">${name}</p>
    <p class="price--text" >$${price}</p>
    </div>
    
    <button href="#" onClick="addTocart(${id})"  class="addtocartItem">Agregar al carrito</button>`;
  conteinerItemsProduct.appendChild(divAddCat);

  const favItem = document.querySelectorAll(".fav--icon--cart");
  const notFavItem = document.querySelectorAll(".svg--icon");
  notFavItem.forEach((element) => {
    element.addEventListener("click", functionNotFav);
  });
  favItem.forEach((element) => {
    element.addEventListener("click", functionFav);
  });
}
let badFav = true;
function functionFav(event) {
  badFav = false;
  const itemFav = event.target;
  const divFav = itemFav.closest(".item--product--contai");
  const heartFav = divFav.querySelector(".svg--icon");
  itemFav.style.display = "none";
  heartFav.style.display = "block";
}
let badNotFav = true;

function functionNotFav(event) {
  badNotFav = false;
  const itemFav = event.target;
  const divNotFav = itemFav.closest(".item--product--contai");
  const notFavItem = divNotFav.querySelector(".svg--icon");
  const FavItem = divNotFav.querySelector(".img--fav");
  FavItem.style.display = "block";
  notFavItem.style.display = "none";
}

let indexCart = 0;
let cantItem = 0;
let cantLS;

function addTocart(id) {
  Toastify({
    duration: 1000,
    text: "¡Producto agregado! 🤩",
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  let band = true;
  let band1 = false;
  let idItemCart;

  if (cart.length != 0) {
    cart.forEach((element) => {
      if (band === true) {
        if (Number(element.id) === id) {
          idItemCart = Number(element.id);
          indexCart = 0;
          band = false;
        } else {
          indexCart = -1;
          band = true;
        }
      }
    });
  } else {
    indexCart = -1;
  }

  products.forEach((product) => {
    if (indexCart === -1 && Number(product.id) === id) {
      cart.push(product);
      let itemLS = JSON.stringify(cart);
      localStorage.setItem("cart", itemLS);
    } else {
      cart.forEach((element, i) => {
        if (band1 === false) {
          if (idItemCart === Number(element.id)) {
            element.cant++;

            band1 = true;
          } else {
            band1 = false;
          }
        }
      });
    }
  });

  const itemLS = JSON.stringify(cart);
  localStorage.setItem("cart", itemLS);
  let cantCartProduct = cart.length;

  let cantItemCart = document.querySelector(".nav--ul-cant");
  cantItemCart.textContent = cantCartProduct;
}

const searchItem = document.querySelector(".nav--input");

searchItem.addEventListener("keyup", functionSearchItem);

function functionSearchItem(event) {
  const item = event.target;

  if (item) {
    const titleItem = document.querySelectorAll(".tittle--text");
    titleItem.forEach((element) => {
      const searchTittle = element.textContent.toLocaleLowerCase();
      const showItem = searchTittle.includes(item.value.toLocaleLowerCase());
      if (item.value.length >= 2) {
        if (!showItem) {
          const div = element.closest(".item--product--descrp");
          div.style.display = "none";
        }
      } else {
        const div = element.closest(".item--product--descrp");
        div.style.display = "";
      }
    });
  }
}

const itemCheckbox = document.querySelector(".dropdowncheck");
let cont = 1;
itemCheckbox.addEventListener("click", functionCheck);

function functionCheck(event) {
  cont++;

  let rest = cont % 2;
  const svgItem = document.querySelector(".svg--menu");
  if (rest === 0) {
    svgItem.innerHTML = "";
    svgItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(139, 67, 56, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>`;
  }
  if (rest === 1) {
    svgItem.innerHTML = "";
    svgItem.innerHTML = `<svg class="svg--menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(139, 67, 56, 1);transform: msFilter"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>`;
  }
}
