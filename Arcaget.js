window.onscroll = function() {scrollFunction()};

function scrollFunction() {

let mybutton = document.getElementById("myBtn");
let Explore = document.getElementById("Explore");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }

if(( document.documentElement.scrollTop < document.body.scrollHeight-1000)){
  Explore.style.display = "block";
}
else{
  Explore.style.display = "none";
}

}

function openNewPage(){
  let desktop1 = document.getElementById("desktop-only1");
let desktop2 = document.getElementById("desktop-only2");
let desktop3 = document.getElementById("desktop-only3");
desktop2.style.display = "block";
desktop1.style.display = "none";
desktop3.style.display = "none";
}


function returnPage(){
  let desktop1 = document.getElementById("desktop-only1");
let desktop2 = document.getElementById("desktop-only2");
let desktop3 = document.getElementById("desktop-only3");
desktop1.style.display = "block";
desktop3.style.display = "block";
desktop2.style.display = "none";
}



function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}