document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar() {

    const resposta = await api("/channels");

    if (!resposta || !resposta.success) {

        console.log("Erro ao carregar API");

        return;

    }

    montarPagina(resposta.data);

}

iniciarHero(resposta.data);

function montarPagina(canais){

    const categorias = {};

    canais.forEach(canal=>{

        if(!categorias[canal.category]){

            categorias[canal.category]=[];

        }

        categorias[canal.category].push(canal);

    });

    const container=document.getElementById("categorias");

    container.innerHTML="";

    Object.keys(categorias).forEach(nome=>{

        container.innerHTML+=criarCategoria(nome,categorias[nome]);

    });

}
