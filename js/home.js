document.addEventListener("DOMContentLoaded", iniciar);

async function iniciar(){

    try{

        // Carrega todos os canais
        const resposta = await api("/channels");

        if(!resposta || !resposta.success){

            console.error("Erro ao carregar canais");

            return;

        }

        STORE.canais = resposta.data;

        // Agenda de esportes
        carregarAgenda();

        // Seções da Home
        montarCanaisDestaque(STORE.canais);

        montarCanaisAbertos(STORE.canais);

        montarEsportes(STORE.canais);

        montarNoticias(STORE.canais);

        montarDocumentarios(STORE.canais);

        montarInfantil(STORE.canais);

    }catch(erro){

        console.error("Erro:", erro);

    }

}
