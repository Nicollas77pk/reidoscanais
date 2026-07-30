document.addEventListener("DOMContentLoaded", iniciar);


async function iniciar(){

    try{


        const resposta = await api("/channels");


        if(!resposta || !resposta.success){

            console.error("Erro ao carregar canais");

            return;

        }



STORE.canais = resposta.data;

carregarAgenda();

montarPagina(STORE.canais);

montarCanaisDestaque(STORE.canais);



    }catch(erro){

        console.error(erro);

    }

}
