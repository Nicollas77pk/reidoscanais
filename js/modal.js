const modal = document.getElementById("playerModal");

const frame = document.getElementById("playerFrame");

const fechar = document.getElementById("fecharModal");

const logo = document.getElementById("modalLogo");

const titulo = document.getElementById("modalTitulo");

const categoria = document.getElementById("modalCategoria");

const atual = document.getElementById("programaAtual");

const proximo = document.getElementById("proximoPrograma");

function abrirPlayer(canal){

    frame.src = canal.embeds[0].embed_url;

    logo.src = canal.logo_url;

    titulo.textContent = canal.name;

    categoria.textContent = canal.category;

    atual.textContent =
        canal.epg?.current?.title || "-";

    proximo.textContent =
        canal.epg?.next?.title || "-";

    modal.classList.add("ativo");

    document.body.style.overflow="hidden";

}

fechar.onclick=()=>{

    modal.classList.remove("ativo");

    frame.src="";

    document.body.style.overflow="auto";

};

modal.onclick=(e)=>{

    if(e.target===modal){

        fechar.click();

    }

};

document.addEventListener("click", function(e){

    const card = e.target.closest(".card");

    if(!card) return;

    const id = card.dataset.id;

    const canal = STORE.canais.find(c => c.id === id);

    if(!canal) return;

    abrirPlayer(canal);

});
