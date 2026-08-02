document.addEventListener("DOMContentLoaded", iniciarCategoria);

async function iniciarCategoria() {

    const params = new URLSearchParams(window.location.search);

    const categoria = params.get("categoria");

    if (!categoria) {

        window.location.href = "index.html";

        return;

    }

    // SEO
    document.title =
        `${categoria} ao vivo | Assistir ${categoria} Online | Rei Dos Canais`;

    const metaDescription =
        document.querySelector('meta[name="description"]');

    if (metaDescription) {

        metaDescription.setAttribute(
            "content",
            `Assista aos melhores canais de ${categoria} ao vivo. Veja programação, canais populares e muito mais no Rei Dos Canais.`
        );

    }

    // Título da página

    document.getElementById("tituloCategoria").textContent =
        `Canais de ${categoria}`;

    try {

        const resposta =
            await api(`/channels?category=${encodeURIComponent(categoria)}`);

        if (!resposta || !resposta.success) {

            console.error("Categoria não encontrada.");

            document.getElementById("listaCanais").innerHTML = `
                <p class="sem-resultados">
                    Nenhum canal encontrado.
                </p>
            `;

            return;

        }

        STORE.canais = resposta.data;

        document.getElementById("totalCanais").textContent =
            `${resposta.data.length} canais encontrados`;

        montarGrid(resposta.data);

        // Próxima etapa
        // montarVejaTambem(categoria);

    }

    catch (erro) {

        console.error("Erro:", erro);

    }

}



function montarGrid(canais) {

    const container =
        document.getElementById("listaCanais");

    container.innerHTML = "";

    canais.forEach(canal => {

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

}
