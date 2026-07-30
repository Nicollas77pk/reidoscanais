function criarAgenda(eventos){

    const container = document.getElementById("agendaSlider");


    if(!container){

        console.log("agendaSlider não encontrado");

        return;

    }


    container.innerHTML = "";


    eventos
    .slice(0,10)
    .forEach(evento => {


        const hora = evento.start_time 
        ? evento.start_time.substring(11,16)
        : "--:--";


        container.innerHTML += `


        <div class="event-card">


            <div class="event-image">


                <img 
                src="${evento.poster || 'assets/sem-imagem.png'}"
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
