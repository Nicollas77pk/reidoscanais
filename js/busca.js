// =========================
// BUSCA GLOBAL
// =========================

let canaisBusca = [];

document.addEventListener("DOMContentLoaded", iniciarBusca);

async function iniciarBusca() {

    const campo = document.getElementById("campoBusca");

    const btnBusca =
document.getElementById("btnBusca");
    
    const resultado = document.getElementById("resultadoBusca");

    if (!campo || !resultado) return;

    try {

        const resposta = await api("/channels");

        if (resposta.success) {

            canaisBusca = resposta.data;

        }

    } catch (e) {

        console.error(e);

    }

    campo.addEventListener("input", () => {

        pesquisar(campo.value);

    });

    campo.addEventListener("focus", () => {

        if (campo.value.length >= 2) {

            pesquisar(campo.value);

        }

    });

    document.addEventListener("click", (e) => {

        if (!e.target.closest(".search")) {

            resultado.style.display = "none";

        }

    });

campo.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        window.location.href =
            `busca.html?q=${encodeURIComponent(campo.value)}`;

    }

});





function normalizar(texto = "") {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}

function pesquisar(texto) {

    const resultado = document.getElementById("resultadoBusca");

    if (!resultado) return;

    texto = normalizar(texto.trim());

    if (texto.length < 2) {

        resultado.style.display = "none";
        return;

    }

    const encontrados = canaisBusca.filter(canal => {

        const nome = normalizar(canal.name);
        const categoria = normalizar(canal.category);
        const programa = normalizar(canal.epg?.current?.title || "");

        return (
            nome.includes(texto) ||
            categoria.includes(texto) ||
            programa.includes(texto)
        );

    }).slice(0, 10);

    montarResultados(encontrados);

}

function montarResultados(lista) {

    const resultado = document.getElementById("resultadoBusca");

    resultado.innerHTML = "";

    if (lista.length === 0) {

        resultado.innerHTML = `

<div class="resultado-item sem-resultado">

Nenhum canal encontrado.

</div>

`;

        resultado.style.display = "block";
        return;

    }

    lista.forEach(canal => {

        resultado.innerHTML += `

<div
class="resultado-item"
onclick="abrirModal('${canal.id}')">

<img
src="${canal.logo_url}"
alt="${canal.name}"
loading="lazy">

<div class="resultado-info">

<h4>${canal.name}</h4>

<p>

<strong>${canal.category}</strong>

</p>

<p>

${canal.epg?.current?.title || "Sem programação"}

</p>

</div>

</div>

`;

    });

    resultado.style.display = "block";

}
