document.addEventListener(
"DOMContentLoaded",
carregarCategoria
);



async function carregarCategoria(){


const params =
new URLSearchParams(
window.location.search
);



const categoria =
params.get("categoria");



if(!categoria){

return;

}



document.getElementById(
"tituloCategoria"
).textContent =
categoria;



const resposta =
await api(
`/channels?category=${encodeURIComponent(categoria)}`
);



if(
!resposta ||
!resposta.success
){

console.error(
"Erro categoria"
);

return;

}



montarCanais(
resposta.data
);



}





function montarCanais(canais){


const container =
document.getElementById(
"listaCanais"
);



container.innerHTML="";



canais.forEach(canal=>{


container.innerHTML += `


<div 
class="canal-card"
onclick="abrirModal('${canal.id}')">



<div class="canal-logo">


<img 
src="${canal.logo_url}"
alt="${canal.name}">


</div>




<div class="canal-info">


<h3>

${canal.name}

</h3>



<p>

${canal.epg?.current?.title || "Sem programação"}

</p>


</div>



</div>


`;


});


}
