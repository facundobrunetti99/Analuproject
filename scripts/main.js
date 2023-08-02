
const sliderInner=document.querySelector(".slider--inner");
const cantImg=document.querySelectorAll('.img--slider');

let index =1;

setInterval(function (){
    let grade=index *-100;
    sliderInner.style.transform="translateX("+grade+"%)"
    index++;
    if(cantImg.length-1<index){
        index=0;
    }
},5000);


const itemCheckbox=document.querySelector('.dropdowncheck');
let cont=1;
itemCheckbox.addEventListener('click',functionCheck);

function functionCheck(event){
  cont++;
  const item=event.target;
  const cont1=Number(cont);
let ml=cont%2
  const svgItem=document.querySelector('.svg--menu');
    if(ml===0){
   
      svgItem.innerHTML="";
      svgItem.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(139, 67, 56, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>`;
    }if(ml===1){
    
      svgItem.innerHTML="";
      svgItem.innerHTML=`<svg class="svg--menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(139, 67, 56, 1);transform: msFilter"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>`;
    }
    
}