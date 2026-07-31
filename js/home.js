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


        montarCategorias(STORE.canais);



    }catch(erro){

        console.error("Erro:", erro);

    }

}
