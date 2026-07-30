function criarCard(canal){

    return `

    <div class="card" data-id="${canal.id}">

        <div class="card-logo">

            <img
                src="${canal.logo_url}"
                alt="${canal.name}"
                loading="lazy">

        </div>

        <div class="card-info">

            <h3>

                ${canal.name}

            </h3>

            <span class="status">

                AO VIVO

            </span>

            <p class="programa">

                ${canal.epg?.current?.title || "Programação indisponível"}

            </p>

            <button class="assistir">

                ▶ Assistir

            </button>

        </div>

    </div>

    `;

}
