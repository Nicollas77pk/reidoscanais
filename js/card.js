function criarCard(canal){

    return `

    <div
        class="card"
        onclick="abrirPlayer(${JSON.stringify(canal).replace(/"/g,'&quot;')})">

        <div class="card-logo">

            <img
                src="${canal.logo_url}"
                loading="lazy">

        </div>

        <div class="card-info">

            <h3>${canal.name}</h3>

            <span class="status">

                🔴 ${canal.epg.current.title}

            </span>

            <button class="assistir">

                ▶ Assistir

            </button>

        </div>

    </div>

    `;

}
