async function carregarAgenda(){

    try{

        const resposta = await api("/sports?status=live");


        if(!resposta || !resposta.success){

            console.error("Erro agenda");

            return;

        }


        STORE.esportes = resposta.data;


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


<div 
class="event-card"
data-id="${evento.id}"
data-tipo="sport"
onclick="abrirModalEsporte('${evento.id}')">


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
iniciarSliderAgenda();

}

function iniciarSliderAgenda(){

    const slider =
    document.getElementById("agendaSlider");

    if(!slider) return;

    const card =
    slider.querySelector(".event-card");

    if(!card) return;

    const largura =
    card.offsetWidth + 16;



    document
    .getElementById("agendaNext")
    .onclick = ()=>{

        slider.scrollBy({

            left:largura,

            behavior:"smooth"

        });

    };



    document
    .getElementById("agendaPrev")
    .onclick = ()=>{

        slider.scrollBy({

            left:-largura,

            behavior:"smooth"

        });

    };



    let intervalo =
    setInterval(()=>{

        if(
            slider.scrollLeft + slider.clientWidth
            >=
            slider.scrollWidth - 20
        ){

            slider.scrollTo({

                left:0,

                behavior:"smooth"

            });

        }

        else{

            slider.scrollBy({

                left:largura,

                behavior:"smooth"

            });

        }

    },6000);



    slider.addEventListener("mouseenter",()=>{

        clearInterval(intervalo);

    });



    slider.addEventListener("mouseleave",()=>{

        intervalo =
        setInterval(()=>{

            if(
                slider.scrollLeft + slider.clientWidth
                >=
                slider.scrollWidth - 20
            ){

                slider.scrollTo({

                    left:0,

                    behavior:"smooth"

                });

            }

            else{

                slider.scrollBy({

                    left:largura,

                    behavior:"smooth"

                });

            }

        },6000);

    });

}
