const modal = document.getElementById("playerModal");

const frame = document.getElementById("playerFrame");

const fechar = document.getElementById("fecharModal");

const logo = document.getElementById("modalLogo");

const titulo = document.getElementById("modalTitulo");

const categoria = document.getElementById("modalCategoria");

const atual = document.getElementById("programaAtual");

const proximo = document.getElementById("proximoPrograma");





async function abrirModal(id){


    try{


        const resposta =
        await api(`/channels/${id}`);



        if(!resposta || !resposta.success){

            console.error("Canal não encontrado");

            return;

        }



        const canal =
        resposta.data;



        abrirPlayer(canal);



    }catch(erro){


        console.error(
            "Erro ao abrir canal:",
            erro
        );


    }


}


async function abrirModalEsporte(id){


    try{


        const resposta =
        await api(`/sports/${id}`);



        if(!resposta || !resposta.success){

            console.error("Evento não encontrado");

            return;

        }



        const evento =
        resposta.data;



        abrirPlayerEsporte(evento);



    }catch(erro){


        console.error(
            "Erro ao abrir esporte:",
            erro
        );


    }


}




function abrirPlayer(canal){



    if(
        !canal.embeds ||
        canal.embeds.length === 0
    ){

        alert("Player indisponível");

        return;

    }



    frame.src =
    canal.embeds[0].embed_url;



    logo.src =
    canal.logo_url;



    titulo.textContent =
    canal.name;



    categoria.textContent =
    canal.category;



    atual.textContent =
    canal.epg?.current?.title ||
    "Sem programação";



    proximo.textContent =
    canal.epg?.next?.title ||
    "Sem informação";



    modal.classList.add("ativo");


    document.body.style.overflow="hidden";


}






fechar.onclick =
fecharPlayer;





function fecharPlayer(){


    modal.classList.remove("ativo");


    frame.src="";


    document.body.style.overflow="auto";


}






modal.onclick=function(e){


    if(e.target === modal){


        fecharPlayer();


    }


};
function abrirPlayerEsporte(evento){



    if(
        !evento.embeds ||
        evento.embeds.length === 0
    ){

        alert("Transmissão indisponível");

        return;

    }



    frame.src =
    evento.embeds[0].embed_url;



    logo.src =
    evento.poster;



    titulo.textContent =
    evento.title;



    categoria.textContent =
    evento.competition;



    atual.textContent =
    evento.description ||
    "Evento ao vivo";



    proximo.textContent =
    evento.start_time
    ?
    "Início: " + evento.start_time
    :
    "Sem horário";



    modal.classList.add("ativo");


    document.body.style.overflow="hidden";


}
