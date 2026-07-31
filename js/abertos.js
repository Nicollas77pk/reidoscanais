function montarCanaisAbertos(canais){

    const slider = document.getElementById("abertosSlider");

    if(!slider) return;

    slider.innerHTML = "";

    canais
    .filter(canal => canal.category === "Abertos")
    .forEach(canal=>{

        slider.innerHTML += `

        <div class="canal-card"
            onclick="abrirModal('${canal.id}')">

            <div class="canal-logo">

                <img
                    src="${canal.logo_url}"
                    alt="${canal.name}"
                    loading="lazy">

            </div>

            <div class="canal-info">

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
    slider.querySelector(".canal-card");

    if(!card) return;

    const largura =
    card.offsetWidth + 16;

    document.getElementById("abertosNext").onclick = ()=>{

        slider.scrollBy({

            left:largura,

            behavior:"smooth"

        });

    };

    document.getElementById("abertosPrev").onclick = ()=>{

        slider.scrollBy({

            left:-largura,

            behavior:"smooth"

        });

    };

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

        }else{

            slider.scrollBy({

                left:largura,

                behavior:"smooth"

            });

        }

    },6000);

}
