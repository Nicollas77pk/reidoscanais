async function api(endpoint) {

    try {

        const resposta = await fetch(CONFIG.API_URL + endpoint);

        if (!resposta.ok) {

            throw new Error("Erro ao conectar com a API.");

        }

        return await resposta.json();

    }

    catch (erro) {

        console.error(erro);

        return null;

    }

}
