async function carregarAgenda(){

    try{

        const resposta = await api("/sports");


        if(!resposta || !resposta.success){

            console.log("Erro ao carregar agenda");

            return;

        }


        criarAgenda(resposta.data);


    }catch(erro){

        console.error("Erro agenda:", erro);

    }

}



function criarAgenda(eventos){


    const container = document.getElementById("agendaSlider");


    container.innerHTML = "";



    eventos
    .filter(evento => evento.status !== "finished")
    .slice(0,10)
    .forEach(evento => {


        container.innerHTML += `

        <div class="event-card">


            <div class="event-status">

                🔴 ${evento.status === "live" ? "AO VIVO" : "PRÓXIMO"}

            </div>



            <h3 class="event-title">

                ${evento.title}

            </h3>



            <p class="competition">

                ${evento.competition}

            </p>



            <div class="times">


                <div>

                    <img src="${evento.teams.home.logo}">

                    <span>
                        ${evento.teams.home.name}
                    </span>

                </div>



                <strong>
                    X
                </strong>



                <div>

                    <img src="${evento.teams.away.logo}">

                    <span>
                        ${evento.teams.away.name}
                    </span>

                </div>


            </div>



            <p class="event-time">

                ${evento.start_time}

            </p>



            <button class="assistir-evento">

                ▶ Assistir

            </button>


        </div>

        `;


    });


}
