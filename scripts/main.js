
const sliderInner=document.querySelector(".slider--inner");
const cantImg=document.querySelectorAll('.img--slider');

let index =1;
setInterval(function (){
    let p=index *-100;
    sliderInner.style.transform="translateX("+p+"%)"
    index++;
    if(cantImg.length-1<index){
        index=0;
    }
},5000);