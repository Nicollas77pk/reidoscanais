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
       STORE.canais = resposta.data;


montarPagina(STORE.canais);


carregarAgenda();


    }catch(erro){

        console.error("Erro:", erro);

    }

}
