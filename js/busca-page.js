document.addEventListener("DOMContentLoaded", iniciarBuscaPagina);

async function iniciarBuscaPagina() {

    const params = new URLSearchParams(window.location.search);

    const termo = params.get("q") || "";

    // Atualiza o campo de busca
    const campo = document.getElementById("campoBusca");
    if (campo) campo.value = termo;

    // Atualiza os títulos
    document.getElementById("tituloBusca").textContent =
        `Resultados para "${termo}"`;

    document.getElementById("descricaoBusca").textContent =
        "Pesquisando canais...";

    try {

        const resposta = await api("/channels");

        if (!resposta || !resposta.success) {

            throw new Error("Erro ao carregar canais");

        }

        const texto = normalizar(termo);

        const resultados = resposta.data.filter(canal => {

            const nome = normalizar(canal.name || "");
            const categoria = normalizar(canal.category || "");
            const programa = normalizar(canal.epg?.current?.title || "");

            return (
                nome.includes(texto) ||
                categoria.includes(texto) ||
                programa.includes(texto)
            );

        });

        document.getElementById("descricaoBusca").textContent =
            `${resultados.length} resultado(s) encontrado(s).`;

        montarResultadosPagina(resultados);

    } catch (erro) {

        console.error(erro);

    }

}

function montarResultadosPagina(canais) {

    const container =
        document.getElementById("listaResultados");

    container.innerHTML = "";

    if (canais.length === 0) {

        container.innerHTML = `

<div class="sem-resultados">

<h2>Nenhum canal encontrado.</h2>

<p>Tente pesquisar por outro nome.</p>

</div>

`;

        return;

    }

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

<strong>${canal.category}</strong>

</p>

<p>

${canal.epg?.current?.title || "Programação indisponível"}

</p>

</div>

</div>

`;

    });

}

function normalizar(texto = "") {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}
