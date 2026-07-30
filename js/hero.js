let heroAtual = 0;

function iniciarHero(canais){

    const lista = canais.filter(c => c.epg?.current?.image);

    if(lista.length === 0) return;

    atualizarHero(lista);

    setInterval(()=>{

        heroAtual++;

        if(heroAtual >= lista.length){

            heroAtual = 0;

        }

        atualizarHero(lista);

    },8000);

}

function atualizarHero(lista){

    const canal = lista[heroAtual];

    document.getElementById("heroTitulo").textContent = canal.name;

    document.getElementById("heroDescricao").textContent =
        canal.epg.current.title;

    document.getElementById("heroImagem").src =
        canal.epg.current.image;

    document.getElementById("btnAssistirHero").onclick = ()=>{

        window.open(
            canal.embeds[0].embed_url,
            "_blank"
        );

    };

}
