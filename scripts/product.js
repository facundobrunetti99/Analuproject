const extraerProductos = async () => {
  const resp = await fetch("../JSON/catalog.json");
  const data = await resp.json();
  cargarProductos(data);
};

extraerProductos();
let cart = [];

if (localStorage.length > 0) {
  cart = JSON.parse(localStorage.getItem("cart"));
  cantCartProduct = cart.length;
  let cantItemCart = document.querySelector(".nav--ul-cant");
  cantItemCart.textContent = cantCartProduct;
}

let products = [];
const cargarProductos = (data) => {
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
    <button  href="#" class="fav--icon--cart">
    <img class="img--fav" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXRJREFUSEvFVEGOgkAQrIbL4G0TvONLVl6ivkR9ie5Llp8sd0n2JnNY7U0j4MAAzrgxO4nRTEtVV3VThBcfejE+/ofgpNSSgmAF5iWAvFLJ/BFrfZSfhVJrBMH7WN10xVJQRNEnAAEeOll9OVwnOobX6/5N61tTQNeiDjjzJgSyHyAhIAHRFvLdnJE6M+/mWu8tgsoWIuk+j8ty0W//W6nkcq+nE/UEzJvGztaiYjY7gHnd78Bny05KbYloB6JjfD5vOhYVUcRyEZfl05tluJDFZVmpvCuIoi/xOGRemEPyUVDbKDitzZZFpn8+4PLf1iLAVmAU85A59VVhdA9mTudaVyvd8bsZtEj0IanBD/X703ZvERirKPvuRNIDt1bc2hgfkkfgloJmqC4kLuCjBFKYInEFnyQYI5H7C1Ez0MFYmUzTyYy5Rbd8qhgfyqz+806x0LNLMJzAH1pkdmP4LnllpenYW++kwDcyvGbwF3Avi54l+gViCvAZW/3vlQAAAABJRU5ErkJggg=="/>   </button>
   <button class="svg--icon"><img class="img--notfav" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAR5JREFUSEvFlUEOgjAQRf/gprgzwb2eRD2JehLhJOJJ9Ca6l8SddKNjCkKEFilQY1ekbf7r/52hhB8P+rE+/gO4CrEkz1uDeQngkrlkPgRSxuozEWIDz1s0rX+mojlIfP8IQAmbxuk9aV4nikfPZzSRMj8UUI2oRdzqupg5nEoZaYAsFiJ1+uGDeVvEWUaUjMd7MG+Gq6tcKA7u920losT32Yl4LnIK0nRVB5wBzBxBLkGazqsAlxGZHFyF2BFR6MIBM6+mUmYlXekDRxdd5q8BbkLMHnmp9r2LMntjo6nJARBNXHNQUHtAjOKNgI5OGsW/AiwhX8VbAS2QVnErQAPEStwaUIOg+A3YNGWnJ1NV1+dj4hxgI1jf08lBH8ALdISGGdIfSR8AAAAASUVORK5CYII="/> </button>
    </div>
   
    <div class="item--product--descrp div--descr--item">
    <p class="tittle--text"data-aos="fade-down" data-aos-delay="100">${name}</p>
    <p class="price--text" data-aos="fade-down">$${price}</p>
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
        }
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
