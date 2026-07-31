function montarCategorias(canais) {

    const container = document.getElementById("categorias");

    if (!container) return;

    container.innerHTML = "";

    // Agrupa canais por categoria
    const grupos = {};

    canais.forEach(canal => {

        const categoria = canal.category || "Outros";

        if (!grupos[categoria]) {

            grupos[categoria] = [];

        }

        grupos[categoria].push(canal);

    });

    // Cria uma seção para cada categoria
    Object.keys(grupos).forEach((categoria, index) => {

        const id = "sliderCategoria" + index;

        container.innerHTML += `

        <section class="categoria-section">

            <div class="container">

                <div class="section-top">

                    <h2>${categoria}</h2>

                    <div class="section-actions">

                        <button class="slider-btn" onclick="moverSlider('${id}',-1)">
                            ‹
                        </button>

                        <button class="slider-btn" onclick="moverSlider('${id}',1)">
                            ›
                        </button>

                        <a href="#" class="ver-todos">
                            Ver todos →
                        </a>

                    </div>

                </div>

                <div class="categoria-slider" id="${id}">

                </div>

            </div>

        </section>

        `;

        const slider = document.getElementById(id);

        grupos[categoria].forEach(canal => {

            slider.innerHTML += `

            <div class="canal-card" onclick="abrirModal('${canal.id}')">

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

    });

}function moverSlider(id, direcao) {

    const slider = document.getElementById(id);

    if (!slider) return;

    const card = slider.querySelector(".canal-card");

    if (!card) return;

    slider.scrollBy({

        left: (card.offsetWidth + 16) * direcao,

        behavior: "smooth"

    });

}
