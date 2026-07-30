document.addEventListener("DOMContentLoaded", iniciar);


async function iniciar(){

    try{

        const resposta = await api("/channels");


        if(!resposta || !resposta.success){

            console.error("Erro ao carregar canais");

            return;

        }


        // Guarda todos os canais na memória
        STORE.canais = resposta.data;


        // Monta as categorias e cards
        montarPagina(STORE.canais);


    }catch(erro){

        console.error("Erro:", erro);

    }

}
