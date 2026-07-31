function montarCanaisDestaque(canais){

    const container =
    document.getElementById("canaisSlider");

    if(!container) return;

    container.innerHTML = "";

    canais
    .slice(0,20)
    .forEach(canal=>{

        container.innerHTML += `

        <div class="canal-card"
            onclick="abrirModal('${canal.id}')">

            <div class="canal-logo">

                <img
                    src="${canal.logo_url}"
                    alt="${canal.name}">

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
