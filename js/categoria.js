function criarCategoria(nome,canais){

    return `

    <section class="categoria">

        <div class="titulo">

            <h2>${iconeCategoria(nome)} ${nome}</h2>

        </div>

        <div class="cards">

            ${canais.map(criarCard).join("")}

        </div>

    </section>

    `;

}

function iconeCategoria(nome){

    const icones={

        "Abertos":"📺",

        "Esportes":"⚽",

        "Filmes":"🎬",

        "Infantil":"🧸",

        "Notícias":"📰",

        "Entretenimento":"🍿",

        "Documentários":"🌍",

        "Música":"🎵",

        "Religiosos":"🙏",

        "Adulto":"🔞"

    };

    return icones[nome] || "📡";

}
