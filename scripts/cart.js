let cartLs=JSON.parse(localStorage.getItem("cart"));
const cotainerCart=document.querySelector(".container__cart--item");
let total=0;
if(localStorage.length>0){
        cart=JSON.parse(localStorage.getItem("cart"));
        cantCartProduct=cart.length;
        let cantItemCart= document.querySelector(".nav--ul-cant");
        cantItemCart.textContent=cantCartProduct;
      
     
    cartLs.forEach((element)=>{
        const itemCart=document.createElement('div');
        itemCart.className="cart--item";
        itemCart.innerHTML=`<img src="${element.img}" alt="" class="cart--img">
        <p class="cart--item--description">${element.name}</p>
        <p class="cart--price">$${element.price}</p>
        <input type="number" name="" id="input--cant--item" value="${element.cant}"> 
        <a class="cart-button--delete"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 24 24" style="fill: rgba(167, 21, 226, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></a> `;
        cotainerCart.append(itemCart);
        total+=element.cant*Number(element.price);
        
    })

    let totalItem=document.querySelector(".total--price--cart");
    totalItem.innerHTML=`$${total}`;
   
}
