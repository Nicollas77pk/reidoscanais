document.addEventListener("DOMContentLoaded", iniciar);


async function iniciar(){

    try{

        const resposta = await api("/channels");


        if(!resposta || !resposta.success){

            console.error("Erro ao carregar canais");

            return;

        }


        STORE.canais = resposta.data;


        // Primeiro monta os canais
        montarPagina(STORE.canais);



        // Depois tenta carregar agenda
        if(typeof carregarAgenda === "function"){

            carregarAgenda();

        }else{

            console.warn("carregarAgenda não encontrada");

        }


    }catch(erro){

        console.error("Erro:", erro);

    }

}
