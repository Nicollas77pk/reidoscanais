// =========================
// BUSCA GLOBAL
// =========================

let canaisBusca = [];

document.addEventListener("DOMContentLoaded", iniciarBusca);

async function iniciarBusca(){

    const campo =
    document.getElementById("campoBusca");

    const resultado =
    document.getElementById("resultadoBusca");

    if(!campo || !resultado) return;

    // Carrega apenas uma vez

    try{

        const resposta =
        await api("/channels");

        if(resposta && resposta.success){

            canaisBusca = resposta.data;

        }

    }catch(e){

        console.error(e);

    }

    // Pesquisa enquanto digita

    campo.addEventListener("input",()=>{

        pesquisar(campo.value);

    });

    // Fecha ao clicar fora

    document.addEventListener("click",(e)=>{

        if(!e.target.closest(".search")){

            resultado.style.display="none";

        }

    });

    // ENTER

    campo.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            window.location.href=
            `busca.html?q=${encodeURIComponent(campo.value)}`;

        }

    });

}

function pesquisar(texto){

    const resultado =
    document.getElementById("resultadoBusca");

    if(!resultado) return;

    texto = texto.trim().toLowerCase();

    if(texto.length<2){

        resultado.style.display="none";

        return;

    }

    const encontrados =
    canaisBusca.filter(canal=>{

        const nome =
        (canal.name || "").toLowerCase();

        const categoria =
        (canal.category || "").toLowerCase();

        const programa =
        (canal.epg?.current?.title || "").toLowerCase();

        return(

            nome.includes(texto)

            ||

            categoria.includes(texto)

            ||

            programa.includes(texto)

        );

    }).slice(0,8);

    montarResultados(encontrados);

}

function montarResultados(lista){

    const resultado =
    document.getElementById("resultadoBusca");

    resultado.innerHTML="";

    if(lista.length===0){

        resultado.innerHTML=`

<div class="resultado-item">

Nenhum canal encontrado.

</div>

`;

        resultado.style.display="block";

        return;

    }

    lista.forEach(canal=>{

        resultado.innerHTML += `

<div
class="resultado-item"
onclick="abrirModal('${canal.id}')">

<img
src="${canal.logo_url}"
alt="${canal.name}">

<div class="resultado-info">

<h4>

${canal.name}

</h4>

<p>

${canal.epg?.current?.title || "Sem programação"}

</p>

</div>

</div>

`;

    });

    resultado.style.display="block";

}

