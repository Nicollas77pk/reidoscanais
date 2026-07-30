async function carregarAgenda(){


    try{


        const resposta = await api("/sports");



        if(!resposta || !resposta.success){

            console.error("Erro agenda");

            return;

        }



        montarAgenda(resposta.data);



    }catch(erro){


        console.error(
            "Erro agenda:",
            erro
        );


    }


}




function montarAgenda(eventos){


    const container =
    document.getElementById("agendaSlider");



    if(!container){

        return;

    }



    container.innerHTML="";



    eventos
    .filter(e => e.status !== "finished")
    .slice(0,10)
    .forEach(evento=>{


        const hora =
        evento.start_time
        ?
        evento.start_time.substring(11,16)
        :
        "--:--";



        container.innerHTML += `


        <div class="event-card">


            <div class="event-image">


                <img 
                src="${evento.poster}"
                alt="${evento.title}"
                >



                <span class="event-badge">

                    ⏰ Hoje · ${hora}

                </span>


            </div>



            <div class="event-info">


                <h3 class="event-title">

                    ${evento.title}

                </h3>



                <p class="event-meta">

                    ${evento.competition} · ${hora}

                </p>


            </div>


        </div>


        `;


    });


}
