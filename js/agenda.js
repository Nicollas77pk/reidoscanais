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



    eventos.slice(0,10).forEach(evento=>{


        container.innerHTML += `

        <div class="event-card">


            <div class="event-status">

                ${evento.status || "Próximo"}

            </div>


            <h3 class="event-title">

                ${evento.name || evento.title}

            </h3>


            <p class="event-time">

                ${evento.time || "Horário não informado"}

            </p>


            <button class="assistir-evento">

                ▶ Assistir

            </button>


        </div>


        `;


    });



}
