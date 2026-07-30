document.addEventListener("DOMContentLoaded", async () => {

    console.log("Rei Dos Canais iniciado.");

    const canais = await api("/channels");

    console.log(canais);

});
