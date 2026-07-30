document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar() {

    try {

        const resposta = await api("/channels");

        if (!resposta || !resposta.success) {

            console.error("Erro ao carregar canais.");

            return;

        }

        const canais = resposta.data;

        console.log(canais);

        carregarCategorias(canais);

    }

    catch (erro) {

        console.error(erro);

    }

}

function carregarCategorias(canais){

    carregarSecao("listaAbertos", canais.filter(c=>c.category==="Abertos"));

    carregarSecao("listaEsportes", canais.filter(c=>c.category==="Esportes"));

    carregarSecao("listaFilmes", canais.filter(c=>c.category==="Filmes"));

    carregarSecao("listaInfantil", canais.filter(c=>c.category==="Infantil"));

    carregarSecao("destaques", canais.slice(0,12));

}

function carregarSecao(id, lista){

    const container = document.getElementById(id);

    if(!container) return;

    container.innerHTML = "";

    lista.forEach(canal=>{

        container.innerHTML += criarCard(canal);

    });

}
