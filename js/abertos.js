function montarCanaisAbertos(canais){

    const container =
    document.getElementById("abertosSlider");

    if(!container) return;

    container.innerHTML = "";

canais
.filter(canal => canal.category === "Entretenimento")
.slice(0,20)
.forEach(canal=>{

        container.innerHTML += `

        <div class="aberto-card"
            onclick="abrirModal('${canal.id}')">

            <div class="aberto-logo">

                <img
                    src="${canal.logo_url}"
                    alt="${canal.name}"
                    loading="lazy">

            </div>

            <div class="aberto-info">

                <h3>${canal.name}</h3>

                <p>

                    <strong>Agora:</strong><br>

                    ${canal.epg?.current?.title || "Programação indisponível"}

                </p>

            </div>

        </div>

        `;

    });

    iniciarSliderAbertos();

}

function iniciarSliderAbertos(){

    const slider =
    document.getElementById("abertosSlider");

    if(!slider) return;

    const card =
    slider.querySelector(".aberto-card");

    if(!card) return;

    const largura =
    card.offsetWidth + 16;

    document
    .getElementById("abertosNext")
    .onclick = ()=>{

        slider.scrollBy({

            left: largura,

            behavior:"smooth"

        });

    };

    document
    .getElementById("abertosPrev")
    .onclick = ()=>{

        slider.scrollBy({

            left: -largura,

            behavior:"smooth"

        });

    };

    let intervalo =
    setInterval(()=>{

        if(

            slider.scrollLeft + slider.clientWidth >=
            slider.scrollWidth - 20

        ){

            slider.scrollTo({

                left:0,

                behavior:"smooth"

            });

        }else{

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

                slider.scrollLeft + slider.clientWidth >=
                slider.scrollWidth - 20

            ){

                slider.scrollTo({

                    left:0,

                    behavior:"smooth"

                });

            }else{

                slider.scrollBy({

                    left:largura,

                    behavior:"smooth"

                });

            }

        },6000);

    });

}
