async function carregarCategorias(){

    try{

        const resposta = await api("/channels/categories");

        if(!resposta || !resposta.success){

            console.error("Erro ao carregar categorias");

            return;

        }

        for(const categoria of resposta.data){

            await carregarCategoria(categoria);

        }

    }catch(erro){

        console.error("Erro:", erro);

    }

}



async function carregarCategoria(categoria){

    try{

        const resposta =
        await api(
            `/channels?category=${encodeURIComponent(categoria)}`
        );

        if(!resposta.success) return;

        criarSecaoCategoria(
            categoria,
            resposta.data
        );

    }catch(erro){

        console.error(erro);

    }

}
function criarSecaoCategoria(nome,canais){

    const container =
    document.getElementById("categorias");

    if(!container) return;

    const id =
    nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/\s+/g,"");

    container.innerHTML += `

<section class="categoria-section">

    <div class="container">

        <div class="section-top">

            <h2>

                <svg xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="section-icon">

                    <path d="m17 2-5 5-5-5"></path>

                    <rect
                        width="20"
                        height="15"
                        x="2"
                        y="7"
                        rx="2">
                    </rect>

                </svg>

                ${nome}

            </h2>

            <div class="section-actions">

                <button
                    id="${id}Prev"
                    class="slider-btn">

                    ‹

                </button>

                <button
                    id="${id}Next"
                    class="slider-btn">

                    ›

                </button>

                <a href="#"
                    class="ver-todos">

                    Ver todos →

                </a>

            </div>

        </div>

        <div
            id="${id}Slider"
            class="categoria-slider">

        </div>

    </div>

</section>

`;

    montarCategoria(id,canais);

}

function montarCategoria(id,canais){

    const slider =
    document.getElementById(id+"Slider");

    if(!slider) return;

    slider.innerHTML="";

    canais.forEach(canal=>{

        slider.innerHTML += `

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

            <strong>Agora:</strong><br>

            ${canal.epg?.current?.title || "Programação indisponível"}

        </p>

    </div>

</div>

`;

    });

    iniciarSliderCategoria(id);

}
