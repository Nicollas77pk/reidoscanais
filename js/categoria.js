document.addEventListener("DOMContentLoaded", iniciarCategoria);

async function iniciarCategoria(){

    const params = new URLSearchParams(window.location.search);

    const categoria = params.get("categoria");

    if(!categoria){

        window.location.href = "index.html";

        return;

    }

    document.title = categoria + " | Rei Dos Canais";

    document.getElementById("tituloCategoria").textContent = categoria;

    try{

        const resposta =
        await api(`/channels?category=${encodeURIComponent(categoria)}`);

        if(!resposta || !resposta.success){

            console.error("Categoria não encontrada");

            return;

        }

        STORE.canais = resposta.data;

        document.getElementById("totalCanais").textContent =
        `${resposta.data.length} canais`;

        montarGrid(resposta.data);

    }catch(erro){

        console.error(erro);

    }

}

function montarGrid(canais){

    const container =
    document.getElementById("listaCanais");

    container.innerHTML = "";

    canais.forEach(canal=>{

        container.innerHTML += `

<div
class="canal-card"
onclick="abrirModal('${canal.id}')">

    <div class="canal-logo">

        <img
        src="${canal.logo_url}"
        alt="${canal.name}"
        loading="lazy">

    </div>

    <div class="canal-info">

        <h3>${canal.name}</h3>

        <p>

            <strong>Agora:</strong><br>

            ${canal.epg?.current?.title || "Programação indisponível"}

        </p>

    </div>

</div>

`;

    });

}
