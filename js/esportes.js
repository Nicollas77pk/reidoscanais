function montarEsportes(canais){

    const container =
    document.getElementById("esportesSlider");

    if(!container) return;

    container.innerHTML = "";

   canais
.filter(canal => canal.category === "Esportes")
.slice(0,20)
.forEach(canal=>{

        container.innerHTML += `

        <div class="esporte-card"
            onclick="abrirModal('${canal.id}')">

            <div class="esporte-logo">

                <img
                    src="${canal.logo_url}"
                    alt="${canal.name}">

            </div>

            <div class="esporte-info">

                <h3>${canal.name}</h3>

                <p>

                    <strong>Agora:</strong><br>

                    ${canal.epg?.current?.title || "Programação indisponível"}

                </p>

            </div>

        </div>

        `;

    });

    iniciarSliderEsportes();

}

function iniciarSliderEsportes(){

    const slider =
    document.getElementById("esportesSlider");

    if(!slider) return;

    const card =
    slider.querySelector(".esporte-card");

    if(!card) return;

    const largura =
    card.offsetWidth + 16;

    document
    .getElementById("esportesNext")
    .onclick = ()=>{

        slider.scrollBy({

            left: largura,

            behavior:"smooth"

        });

    };

    document
    .getElementById("esportesPrev")
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
