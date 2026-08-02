document.addEventListener("DOMContentLoaded", iniciarCategoria);

async function iniciarCategoria() {

    const params = new URLSearchParams(window.location.search);

    const categoria = params.get("categoria");

    if (!categoria) {

        window.location.href = "index.html";

        return;

    }

    // ==========================
    // SEO
    // ==========================

    document.title =
        `${categoria} ao vivo | Assistir ${categoria} Online | Rei Dos Canais`;

    const metaDescription =
        document.querySelector('meta[name="description"]');

    if (metaDescription) {

        metaDescription.setAttribute(
            "content",
            `Assista aos melhores canais de ${categoria} ao vivo. Veja programação atualizada, canais populares e muito mais no Rei Dos Canais.`
        );

    }

    // Open Graph

    const ogTitle =
        document.querySelector('meta[property="og:title"]');

    if (ogTitle) {

        ogTitle.setAttribute(
            "content",
            `${categoria} ao vivo | Rei Dos Canais`
        );

    }

    const ogDescription =
        document.querySelector('meta[property="og:description"]');

    if (ogDescription) {

        ogDescription.setAttribute(
            "content",
            `Assista aos principais canais de ${categoria.toLowerCase()} ao vivo.`
        );

    }

    // ==========================
    // TÍTULO DA PÁGINA
    // ==========================

    document.getElementById("tituloCategoria").textContent =
        `Canais de ${categoria}`;

    document.getElementById("breadcrumbCategoria").textContent =
        categoria;

    document.getElementById("descricaoCategoria").textContent =
        `Assista aos melhores canais de ${categoria.toLowerCase()} ao vivo, com programação atualizada e acesso rápido aos principais conteúdos.`;

    try {

        const resposta =
            await api(`/channels?category=${encodeURIComponent(categoria)}`);

        if (!resposta || !resposta.success) {

            console.error("Categoria não encontrada.");

            document.getElementById("listaCanais").innerHTML = `

<div class="sem-resultados">

    <h2>

        Nenhum canal encontrado.

    </h2>

    <p>

        Esta categoria não possui canais disponíveis no momento.

    </p>

</div>

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
