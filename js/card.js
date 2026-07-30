function criarCard(canal){

    return `

        <div class="card">

            <div class="card-logo">

                <img src="${canal.logo}" alt="${canal.nome}">

            </div>

            <div class="card-info">

                <h3>${canal.nome}</h3>

                <span class="status">

                    AO VIVO

                </span>

                <p class="programa">

                    ${canal.programa || "Programação ao vivo"}

                </p>

                <button class="assistir">

                    ▶ Assistir

                </button>

            </div>

        </div>

    `;

}
