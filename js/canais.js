function montarCanaisDestaque(canais){

    const slider = document.getElementById("canaisSlider");

    if(!slider) return;

    slider.innerHTML = "";

    canais
    .slice(0,20)
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

    iniciarSliderCanais();

}

function iniciarSliderCanais(){

    const slider =
    document.getElementById("canaisSlider");

    if(!slider) return;

    const card =
    slider.querySelector(".canal-card");

    if(!card) return;

    const largura =
    card.offsetWidth + 16;

    document.getElementById("canaisNext").onclick = ()=>{

        slider.scrollBy({

            left:largura,

            behavior:"smooth"

        });

    };

    document.getElementById("canaisPrev").onclick = ()=>{

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
