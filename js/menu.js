const btn = document.getElementById("menuBtn");

const menu = document.getElementById("menuMobile");

btn.onclick = ()=>{

    menu.classList.toggle("ativo");

};

document.addEventListener("click",(e)=>{

    if(

        !menu.contains(e.target) &&

        !btn.contains(e.target)

    ){

        menu.classList.remove("ativo");

    }

});
