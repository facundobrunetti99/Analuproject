
const extraerProductos = async () => {
    const resp = await fetch("../JSON/catalog.json");
    const data = await resp.json();
    cargarProductos(data);
  
  };




  extraerProductos();
  let cart=[];

  if(localStorage.length>0){
    cart=JSON.parse(localStorage.getItem("cart"));
    cantCartProduct=cart.length;
    let cantItemCart= document.querySelector(".nav--ul-cant");
    cantItemCart.textContent=cantCartProduct;
  }
 

  let products=[];
  const cargarProductos=(data)=>{
        products=data;
        products.forEach((element)=> {
            addItemsCatalog(element.name,element.id,element.img,element.price);
          
        });
  }
function addItemsCatalog(name,id,img,price){
    const conteinerItemsProduct=document.querySelector('.conteiner--catalog');
    const divAddCat=document.createElement('div');
    divAddCat.classList.add("item--product--descrp");
    divAddCat.innerHTML=` <img src= ${img} alt="" class="image--cartHome" data-aos="fade">
    <p class="item--product--descrp"data-aos="fade-down" data-aos-delay="100">Caja de bombones es especial para un regalo, contiende bombones de chocolate con la mejor calidad, podes elegir los mismos a eleccion (elegir antes de la compra)</p>
    <button href="#" onClick="addTocart(${id})"  class="addtocartItem">Agregar al carrito</button>`;
    conteinerItemsProduct.appendChild(divAddCat);
}


let indexCart=0;
let cantItem=0;
let cantLS;

function addTocart(id){

    let band=true;
    let band1=false;
    let idItemCart;
   
    if(cart.length!=0){
        cart.forEach((element)=>{
            if(band===true){
                if(Number(element.id)===id){
                    idItemCart=Number(element.id);
                    indexCart=0;
                    band=false;
                  }else{
                      indexCart=-1;
                      band=true;
                  }
            }

           })
        

    }else{
        indexCart=-1;
    }
  
    products.forEach((product)=>{
       if(indexCart===-1 && Number(product.id)===id){
        cart.push(product);
        let itemLS=JSON.stringify(cart);
        localStorage.setItem("cart",itemLS);
     
       }else{
            cart.forEach((element ,i)=>{
                if(band1===false){
                    if(idItemCart===Number(element.id)){
                     
                       element.cant++;
                      

                        band1=true;
                    }else{
                        band1=false;
                       
                    }
                }
          
                
             })
        
      
        
       }
      
    })



   const itemLS=JSON.stringify(cart);
   localStorage.setItem("cart",itemLS)
   let cantCartProduct=cart.length;


   let cantItemCart= document.querySelector(".nav--ul-cant");
   cantItemCart.textContent=cantCartProduct;

}




 

