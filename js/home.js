document.addEventListener("DOMContentLoaded", iniciar);



async function iniciar(){


    try{


        const resposta = await api("/channels");


        if(!resposta || !resposta.success){

            console.error("Erro canais");

            return;

        }



        STORE.canais = resposta.data;



        carregarAgenda();



        carregarCategorias();



    }catch(erro){

        console.error(erro);

    }


}
