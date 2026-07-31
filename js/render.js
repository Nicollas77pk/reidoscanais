function montarPagina(canais){

    const categorias = {};


    canais.forEach(canal=>{


        if(!categorias[canal.category]){

            categorias[canal.category] = [];

        }


        categorias[canal.category].push(canal);


    });



    const container =
    document.getElementById("categorias");


    container.innerHTML="";



    Object.keys(categorias).forEach(nome=>{


        container.innerHTML += criarCategoria(
            nome,
            categorias[nome]
        );


    });


}
