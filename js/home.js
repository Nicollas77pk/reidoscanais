document.addEventListener("DOMContentLoaded", iniciar);


async function iniciar(){

    try{


        carregarAgenda();


        carregarCategorias();


    }catch(erro){

        console.error("Erro:", erro);

    }

}
