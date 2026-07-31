document.addEventListener("DOMContentLoaded", iniciar);


async function iniciar(){

    try{


        // Carrega agenda esportiva

        carregarAgenda();



        // Carrega categorias automaticamente

        carregarCategorias();



    }catch(erro){


        console.error(
            "Erro:",
            erro
        );


    }

}
