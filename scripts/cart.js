let cartLs=JSON.parse(localStorage.getItem("cart"));
const cotainerCart=document.querySelector(".container__cart--item");
let total=0;
function cartNumber(){
    cart=JSON.parse(localStorage.getItem("cart"));
    cantCartProduct=cart.length;
    let cantItemCart= document.querySelector(".nav--ul-cant");
    cantItemCart.textContent=cantCartProduct;
}

if(localStorage.length>0){
        
    cartNumber();
      
     
    cartLs.forEach((element)=>{
        const itemCart=document.createElement('div');
        itemCart.className="cart--item";
        itemCart.innerHTML=`<img src="${element.img}" alt="" class="cart--img">
        <p class="cart--item--description">${element.name}</p>
        <p class="cart--price">$${element.price}</p>
       <div class="conteiner--cant--element">
       <button class="button--rest">-</button>
       <input value="${element.cant}" class="input--value" maxlength="120"> 
       <button class="button--rest">+</button>
       </div>
        <button class="cart-button--delete" onClick="removeItem(${element.id})"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 24 24" style="fill: rgba(241, 5, 249, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></button> `;
        cotainerCart.append(itemCart);
     
    
    })

    totalItem();
   
} 
function actStorage(){
    const actStorage=JSON.stringify(cartLs);
    localStorage.setItem("cart",actStorage);
}


    
    
function totalItem(){
    const totala=document.querySelector(".total--price--cart");
    let total=0;
    cartLs.forEach((element)=>{
        total+=Number(element.price)*element.cant;

    })
    totala.innerHTML=`$${total}`; 
}


function removeItem(id){
   const idItem=id;
  cartLs.forEach((element,i)=>{
    if(Number(element.id)===idItem){
        element.cant--;
        if(element.cant<1){
            cartLs.splice(i,1)
            
        }
        
    }
  })



   
 actStorage()
  cartNumber()

  totalItem()

}


const ItemButton=document.querySelectorAll('.cart-button--delete');
ItemButton.forEach((element)=>{
    element.addEventListener('click',deleteItemFunctionHTML)
})

function deleteItemFunctionHTML(event){
    const item=event.target;
    const divItemDelete=item.closest('.cart--item')
    const title=divItemDelete.querySelector('.cart--item--description');
    const valueItem=divItemDelete.querySelector('.input--value');
            valueItem.value--;
            if(valueItem.value<1){
              divItemDelete.remove();
            }
        
    
}


